const express = require('express');
const router = express.Router();
const loginFunction = require('../accounts/login');


router.get("/", (req, res) => {
    res.send({ data: "Login route"});
})

router.post("/loginChecker", async(req, res) => {
    
    res.send({ data: "Login successful"});
})

module.exports = router;