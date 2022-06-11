require("dotenv").config()
const { Pool } = require('pg');
global.env = process.env
const connection_string = env["CONNECTION_STRING"]

const pool = new Pool({
    connection_string
})

module.exports = { pool };