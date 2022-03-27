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

async function get_userId(name){
  const client = await pool.connect()

  const { rows } =await client.query({
    text: `select id from users where name =$1`,
    values: [name]
  })
  client.release()
  return rows[0].id
}

async function create_message(userID, message){
  const client = await pool.connect()

  await client.query({
    text: 'insert into messages (user_id, message) values ($1, $2)',
    values: [userID, message]
  })

  client.release()

}

async function get_messages(){
  const client = await pool.connect()

  const { rows } =await client.query({
    text: 'select messages.message,users.name from messages join users on messages.user_id=users.id'
  })

  client.release()
  return rows
}

module.exports = {
  get_user, create_user, get_userId, create_message, get_messages
}