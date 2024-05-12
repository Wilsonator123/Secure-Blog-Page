// JS Imports
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const db = require("./database/index.js");
const helmet = require("helmet");
const { RateLimiterMemory } = require("rate-limiter-flexible");
const { query, validationResult } = require("express-validator");
const { authorize } = require("./middleware.js");


app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(cookieParser());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

const opts = {
	points: 10, // 100 requests
	duration: 1, // Per second
	blockDuration: 5 * 60,
};

const rateLimiter = new RateLimiterMemory(opts);

const rateLimiterMiddleware = (req, res, next) => {
	rateLimiter
		.consume(req.ip)
		.then(() => {
			next();
		})
		.catch(() => {
			res.status(429).send("Too Many Requests");
		});
};

app.use(rateLimiterMiddleware);

// Server Middleware Loging to Console
app.use((req, res, next) => {
	const start = +new Date();
	try {
		next();
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
	const time = +new Date() - start;
	console.log("Request made to", req.path, "took", `${time}ms`);
});
// Routes
app.use("/apiTest", require("./routes/apiTest.js")); //
app.use("/login", require("./routes/login.js"));
app.use("/auth", require("./routes/auth.js"));
app.use("/posts", require("./routes/posts.js"));
app.use("/account", require("./routes/account.js"));
app.use("/comments", require("./routes/comments.js"));

app.get("/", authorize(["read"], true), async (req, res) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		res.json("We made it");
	} else {
		res.json({
			errors: errors.array().map((error) => {
				return error.msg;
			}),
		});
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
