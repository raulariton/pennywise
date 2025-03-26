const Pool = require('pg').Pool
const pool = new Pool({
  user: 'bogdan',
  host: 'localhost',
  database: 'test',
  password: 'adminadmin',
  port: 5432,
})

module.exports = pool

