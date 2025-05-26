const {Pool} = require('pg')

const pool = new Pool({
    user:"postgres",
    host:"localhost",
    port:"5432",
    password:"080306",
    database:"blogdb"
})

module.exports = pool