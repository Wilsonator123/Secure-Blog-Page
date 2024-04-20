const express = require('express');
const router = express.Router();
const loginFunction = require('../accounts/login');
const validator = require("email-validator");



router.get("/", (req, res) => {
    res.send({ data: "Login route"});
})

router.post("/loginChecker", async(req, res) => {
    
    try {
        const body = req.body;
    
        if (validator.validate(body.email) === true){
            res.status(200).send('success');
        }
        else {
            res.status(401).send('wrong email or password');
        }
    } 
    catch (error) {
        console.log(error);
    }
    
    
})

module.exports = router;