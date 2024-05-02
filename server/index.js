// JS Imports
const path = require("path");
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const app = express();
const port = 8000;
const db = require('./database/index.js');
const { query, validationResult} = require('express-validator');
const { authorize } = require('./middleware.js');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors({
	origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
	credentials: true
}));
app.use(cookieParser())
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
app.use("/auth", require('./routes/auth.js'));
app.use("/posts", require('./routes/posts.js'));
app.use("/account", require('./routes/account.js'));

app.get('/',
		authorize(['account:read'], true),
	async (req, res) => {
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			res.json('We made it')
		}
		else {
			res.json({ errors: errors.array().map((error) => {return error.msg}) })
		}

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})