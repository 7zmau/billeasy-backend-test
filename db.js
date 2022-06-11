require("dotenv").config()
const { Pool } = require('pg');
global.env = process.env

const pool = new Pool({
    user: env["USER"],
    host: env["HOST"],
    database: env["DATABASE"],
    password: env["PASSWORD"],
    port: env["PORT"]
})

module.exports = { pool };