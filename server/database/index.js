const { Pool } = require('pg');
const fs = require('fs');

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