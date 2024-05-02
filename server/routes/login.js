const express = require('express');
const router = express.Router();
const loginFunction = require('../accounts/login');
const accountCreation = require('../accounts/accountCreation');
const validator = require("email-validator");
const { body, validationResult} = require('express-validator');
const { setCookie, validateCookie } = require('../utils/cookie.js');


router.get("/", (req, res) => {
    res.send({ data: "Login route"});
})

router.post("/login",
    body('email')
        .notEmpty().withMessage('Email is required')
        .isString().withMessage('Email must be a string')
        .custom((value) => {
            if (validator.validate(value) === false) {
                throw new Error('Invalid email');
            }
            return true;
        })
        .escape(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 chars long')
        .escape(),
    async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array().map((error) => {return error.msg}) });
    }
    try {
        const {email, password} = req.body;

        const result = await loginFunction.login(email, password);

        if (result.success) {
            await setCookie(res, result.message);
            res.status(200).json({ data: "Login successful"});
        }
        else {
            res.status(401).json({ errors: "Email or Password incorrect"});
        }
    } 
    catch (error) {
        console.log(error);
    }
})

router.post("/createUser",
    body('email')
        .notEmpty().withMessage('Email is required')
        .isString().withMessage('Email must be a string')
        .custom((value) => {
            if (validator.validate(value) === false) {
                throw new Error('Invalid email');
            }
            return true;
        })
        .escape(),
    body('fname')
        .notEmpty().withMessage('First name is required')
        .isString().withMessage('First name must be a string')
        .escape(),
    body('lname')
        .notEmpty().withMessage('Last name is required')
        .isString().withMessage('Last name must be a string')
        .escape(),
    body('dob')
        .notEmpty().withMessage('Date of birth is required')
        .isString().withMessage('Date of birth must be a string')
        .escape(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 chars long')
        .escape(),
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map((error) => {return error.msg}) });
        }

        try {
            const {email, fname, lname, dob, password} = req.body;

            const result = await accountCreation.makeUser(email, fname, lname, dob, password);

            if (result.success === true) {
                await setCookie(res, result.message);
                res.status(200).json({ data: "User created"});
            }
            else {
                res.status(401).json({ errors: result.message});
            }
        }
        catch (error) {
            res.status(500).json({ errors: "Internal server error"});
            console.log(error);
        }
    })


module.exports = router;