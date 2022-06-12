require("dotenv").config()
global.env = process.env
const connection_string = env["CONNECTION_STRING"]
const { Pool } = require('pg');

const pool = new Pool({
   // connectionString: connection_string,
   user: env["USER"],
   host: env["HOST"],
   database: env["DATABASE"],
   password: env["PASSWORD"],
   port: env["PORT"],
    // ssl: {
    //     rejectUnauthorized: false
    // }
})

module.exports = { pool };
