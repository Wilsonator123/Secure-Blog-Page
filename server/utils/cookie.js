const { createAndSignJWT, verifyJWT } = require('./auth');


async function setCookie(res, userID, permissions = ['read']) {
    const jwt = await createAndSignJWT(userID, permissions)
    return res.cookie('id', jwt, {httpOnly: true, maxAge: 604800000})
}

async function validateCookie(req, res) {
    const jwt = req.cookies.id
    if(!jwt) {
        return false
    }

    const result = await verifyJWT(jwt)

    if(!result) {
        clearCookie(res)
        return false
    } else {
        return true
    }
}

function clearCookie(res) {
    res.cookie('id', '', { expires: new Date(0), httpOnly: true, sameSite: 'none' })
    console.log('Cookie Cleared')
}

module.exports = {
    setCookie,
    validateCookie,
}