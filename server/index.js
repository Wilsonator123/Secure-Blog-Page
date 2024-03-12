const express = require('express')
const app = express()
const port = 8000
const db = require('./database/index.js')

app.get('/', async (req, res) => {
    const result = await db.query('SELECT NOW()').catch(e => console.error(e.stack))
    res.json(result?.rows)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})