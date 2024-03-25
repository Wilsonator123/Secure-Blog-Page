const { Pool } = require('pg');
const fs = require('fs');

//THIS FILE IS JUST FOR ACCESSING THE DATABASE PLEASE DONT PUT SHIT IN HERE. P's 'n' Q's    USE THIS IN YOUR CODE. Then do db.query(SQL SHIT HERE)      const db = require('./database/index.js')


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

const query = (text, params, callback) => {
    return pool.query(text, params, callback);
}

module.exports = {
    query
}