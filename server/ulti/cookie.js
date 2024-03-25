const { createAndSignJWT, verifyJWT } = require('./auth');


async function setCookie(res, userID) {
    const jwt = await createAndSignJWT(userID)
    res.cookie('id', jwt, {httpOnly: true, secure: true, sameSite: 'none', })
}

async function validateCookie(req, res) {
    const jwt = req.cookies.id
    const result = await verifyJWT(jwt)
    if(result === "Invalid JWT") {
        clearCookie(res)
    } else {
        return result
    }
}

function clearCookie(res) {
    res.cookie('id', '', { expires: new Date(0), httpOnly: true, secure: true, sameSite: 'none' })
    return "Cookie cleared"
}

module.exports = {
    setCookie,
    validateCookie,
}