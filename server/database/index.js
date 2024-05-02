const { Pool } = require('pg');
const fs = require('fs');

//THIS FILE IS JUST FOR ACCESSING THE DATABASE PLEASE DON'T PUT SHIT IN HERE. P's 'n' Q's    USE THIS IN YOUR CODE. Then do db.query(SQL SHIT HERE)      const db = require('./database/index.js')


const secretFilePath = '/run/secrets/db-password';

const secret = fs.readFileSync(secretFilePath, 'utf8');

const pool = new Pool({
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: secret,
        port: process.env.POSTGRES_PORT
    }
);

queries = {
    uuidChecker:'SELECT * FROM "User" WHERE Email = $1',
    isUUIDtaken: `SELECT COUNT(0) FROM "User" WHERE userid = $1`,
    isEmail: 'SELECT COUNT(0) FROM "User" WHERE email = $1',
    isUsername: 'SELECT COUNT(0) FROM "User" WHERE username = $1',
    addUser: 'INSERT INTO "User" (UserID, Username, Email, Fname, Lname, DoB) VALUES ($1, $2, $3, $4, $5, $6)',
    addPassword: 'INSERT INTO "Password" (UserID, Password, Salt) VALUES ($1, $2, $3)',
    getUserID: 'SELECT userid FROM "User" WHERE Email = $1',
    getUserSalt: 'SELECT salt FROM "Password" WHERE userid = $1',
    getUserPassword: 'SELECT password FROM "Password" WHERE userid = $1',
    addUser2FA: 'UPDATE "Password" SET FAsalt = $1 WHERE UserID = $2',
    getUser2FAsalt: 'SELECT fasalt FROM "Password" WHERE UserID = $1',
    update2FAperm: 'UPDATE "User" SET FAsalt = $1 WHERE UserID = $2',
    update2FAstatus: 'UPDATE "User" SET FAVald = TRUE WHERE UserID = $1',
    getUsername: 'SELECT username FROM "User" WHERE UserID = $1'
};

async function query(name,params){
    if (!queries[name]) throw new Error('Invalid Query Name');
    const client = await pool.connect();
    const result = await client.query(queries[name], params)
    await client.release();
    return result.rows;
}

module.exports = {
    query
}