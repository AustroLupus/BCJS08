const { Pool } = require('pg')

const pool = new Pool({
  user: 'ziggywlz',
  host: 'localhost',
  database: 'dostor',
  port: 5432,
  password: '1234',
  max: 20,
  min: 2,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000
})

async function get_user(email) {
  const client = await pool.connect()

  const { rows } = await client.query({
    text: 'select * from users where email=$1',
    values: [email]
  })

  client.release()

  return rows[0]
}

async function create_user(name, email, password) {
  const client = await pool.connect()

  await client.query({
    text: 'insert into users (name, email, password) values ($1, $2, $3)',
    values: [name, email, password]
  })

  client.release()

}

async function create_appointment (user_id, date, time, complain) {
  const client = await pool.connect()

  await client.query({
    text: 'insert into appointments (user_id, date, time, complain) values ($1, $2, $3, $4)',
    values: [user_id, date, time, complain]
  })

  client.release()
}

async function get_appointments (){
  const client = await pool.connect()
  
  const { rows } = await client.query({
    text: 'select * from appointments'
  })

  client.release()

  return rows
}

module.exports = {
  get_user, create_user, create_appointment, get_appointments
}
