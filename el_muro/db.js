const { Pool } = require('pg')

const pool = new Pool({
  user: 'ziggywlz',
  host: 'localhost',
  database: 'el_muro',
  port: 5432,
  password: '1234',
  max: 20,
  min: 2,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000
})