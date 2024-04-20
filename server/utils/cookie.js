const { createAndSignJWT, verifyJWT } = require('./auth');


async function setCookie(res, userID) {
    const jwt = await createAndSignJWT(userID)
    return res.cookie('id', jwt, {httpOnly: true, secure: true, sameSite: 'none', maxAge: 604800000})
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
    res.cookie('id', '', { expires: new Date(0), httpOnly: true, secure: true, sameSite: 'none' })
    console.log('Cookie Cleared')
}

module.exports = {
    setCookie,
    validateCookie,
}