const jose = require('jose')
require("dotenv").config();

const secret = new Uint8Array(Buffer.from(process.env.JWT_SECRET, 'base64'))

async function createAndSignJWT(userID, permissions) {
    const alg = 'HS256'
    const jwt = await new jose.SignJWT({
        iss: 'http://localhost:8000',
        sub: userID,
        aud: 'http://localhost:8000',
        scopes: permissions
    })
        .setProtectedHeader({alg})
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secret)
    return jwt
}

async function verifyJWT(jwt) {
    try {
        const {payload, protectedHeader} = await jose.jwtVerify(jwt, secret)
        return true
    } catch (e) {
        return false
    }
}

async function readJWT(req, res) {
    const jwt = req.cookies.id
    if(!jwt) {
        return false
    }
    try {
        const {payload, protectedHeader} = await jose.jwtVerify(jwt, secret)
        return payload
    } catch (e) {
        return false
    }


}


module.exports = {
    createAndSignJWT,
    verifyJWT,
    readJWT
}