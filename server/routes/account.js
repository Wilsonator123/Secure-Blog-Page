const express = require('express');
const router = express.Router();
const account = require('../accounts/account.js');
const { cookie, validationResult} = require('express-validator');
const { setCookie, validateCookie } = require('../utils/cookie.js');


router.get("/", (req, res) => {
    res.send({ data: "Account route"});
})

router.post("/getUser", cookie('id').custom(
    async (value) => {
        if (await validateCookie(value) === false) {
            throw new Error('Invalid cookie');
        }
        return true;
    }),

    async(req, res) => {
        try {
            const result = await account.getUser(req.cookies.id);

            if (result) {
                res.status(200).json({data: result});
            } else {
                res.status(401).json({errors: "User not found"});
            }
        } catch (error) {
            console.log(error);
        }
    }
);






module.exports = router