require("dotenv").config()
global.env = process.env
const connection_string = "postgres://vyunohcqovugvm:a47bad4da5e8e4005323ecfe0d8bab087d7d0785af12eee53695f0611e7588fb@ec2-54-228-32-29.eu-west-1.compute.amazonaws.com:5432/dbd6nsjqeb6qfs"
const { Pool } = require('pg');

const pool = new Pool({
    connection_string
})

module.exports = { pool };