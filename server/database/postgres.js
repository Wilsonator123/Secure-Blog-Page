const fs = require('fs');
const { Client } = require('pg');


const secretFilePath = '/run/secrets/db-password';

const secret = fs.readFileSync(secretFilePath, 'utf8');

const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: secret,
    port: process.env.DB_PORT
});

async function connect() {

        await client.connect().then(async () => {
            console.log('Connected to PostgreSQL');
            client.query('SELECT NOW()', (err, res) => {
                if (err) {
                    console.error('Error executing query', err.stack);
                } else {
                    console.log('Query result:', res.rows[0]);
                }
                client.end();
            }
            );
        }).catch(err => {
            console.error('Connection error', err.stack);
           client.end();
        })

}

module.exports = {
    connect
}

// Write test query to check if connection works

