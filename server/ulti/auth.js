const jose = require('jose')
require("dotenv").config();

const secret = new Uint8Array(Buffer.from(process.env.JWT_SECRET, 'base64'))

async function createAndSignJWT(userID) {
    const alg = 'HS256'
    const jwt = await new jose.SignJWT({
        iss: 'http://localhost:8000',
        sub: userID,
        aud: 'http://localhost:8000',
        scopes: ['read', 'write', 'delete']
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
        return payload
    } catch (e) {
        return "Invalid JWT"
    }
}

module.exports = {
    createAndSignJWT,
    verifyJWT
}