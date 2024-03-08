const dotenv = require('dotenv')

dotenv.config()

const express = require('express')
const app = express()
const port = 3000
const db = require('./database/postgres')
app.get('/', (req, res) => {
    db.connect()
    res.send("Hello World!")
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})