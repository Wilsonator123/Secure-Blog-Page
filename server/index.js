// JS Imports
const path = require("path");
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
const db = require('./database/index.js');
const helmet = require('helmet');
const { RateLimiterMemory } = require('rate-limiter-flexible');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

const opts = {
	points: 10, // 100 requests
	duration: 1, // Per second
	blockDuration: 5*60
};

const rateLimiter = new RateLimiterMemory(opts);

const rateLimiterMiddleware = (req, res, next) => {
	rateLimiter.consume(req.ip)
		.then(() => {
			next();
		})
		.catch(() => {
			res.status(429).send('Too Many Requests');
		});
};

app.use(rateLimiterMiddleware);


// Server Middleware Loging to Console
app.use((req, res, next) => {
	const start = +new Date();
	next();
	const time = +new Date() - start;
	console.log("Request made to", req.path, "took", `${time}ms`);
});

// Routes
app.use("/apiTest", require('./routes/apiTest.js')); //
app.use("/login", require('./routes/login.js'));

app.get('/', async (req, res) => {
    res.json({ message: 'Hello World!' })
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})