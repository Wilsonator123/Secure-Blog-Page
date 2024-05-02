const { createAndSignJWT, verifyJWT } = require('./auth');
const { getPresetRoles } = require('./roles');
async function setCookie(res, userID, permissions = null) {
    const presetRoles = permissions ? getPresetRoles(permissions) : null
    const jwt = await createAndSignJWT(userID, presetRoles)
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
}

module.exports = {
    setCookie,
    validateCookie,
}