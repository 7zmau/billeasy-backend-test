const { Pool } = require('pg');

const pool = new Pool({
    user: 'login',
    host: 'localhost',
    database: 'billeasy_1',
    password: 'password',
    port: 5432
})

module.exports = { pool };