const Pool = require('pg').Pool
const pool = new Pool({
  user: 'test',
  host: 'test',
  database: 'test',
  password: 'test',
  port: 5432,
})

module.exports = pool

