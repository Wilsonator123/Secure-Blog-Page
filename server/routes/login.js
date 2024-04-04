const express = require('express');
const router = express.Router();
const loginFunction = require('../accounts/login');


router.get("/", (req, res) => {
    res.send({ data: "Login route"});
})

router.post("/loginChecker", async(req, res) => {
    if (req.email === "bing@gmail.com"){
        res.status(200).json(message, "Login successful");
    }
    else {
        res.status(400).json(message, "Incorrect Username or Password");
    }
    
})

module.exports = router;