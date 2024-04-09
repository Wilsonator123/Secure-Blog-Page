// JS Imports
const path = require("path");
const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;
const db = require('./database/index.js');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
    const result = await db.query('SELECT NOW()').catch(e => console.error(e.stack))
    res.json(result?.rows)
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})