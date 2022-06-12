require("dotenv").config()
global.env = process.env
const connection_string = env["DATABASE_URL"]
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: connection_string,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = { pool };
