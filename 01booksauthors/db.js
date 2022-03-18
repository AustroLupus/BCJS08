const { Pool } = require('pg')

const pool = new Pool({
  user: 'ziggywlz',
  host: 'localhost',
  database: 'librosautores',
  port: 5432,
  password: '1234',
  max: 20,
  min: 2,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000
})

async function agregar_libro (titulo, descripcion) {
  const client = await pool.connect()
  const { rows } = await client.query({
    text: `insert into libros (titulo, descripcion) values ($1, $2)
          returning *`,
    values: [titulo, descripcion]
  })
  client.release()
  return rows[0]
}

async function agregar_autor (nombre, apellido, notas) {
  const client = await pool.connect()
  const { rows } = await client.query({
    text: `insert into autores (nombre, apellido, notas) values ($1, $2, $3)
          returning *`,
    values: [nombre, apellido, notas]
  })
  client.release()
  return rows[0]
}

async function get_libros() {
  const client = await pool.connect()
  const { rows } = await client.query('select * from libros')
  client.release()
  return rows
}

async function get_autores() {
  const client = await pool.connect()
  const { rows } = await client.query('select * from autores')
  client.release()
  return rows
}

async function add_libro_autor(libro_id,autor_id){
  const libroId = parseInt(libro_id)
  const autorId = parseInt(autor_id)
  const client = await pool.connect()
  await client.query({
    text: `insert into escriben (libro_id, autor_id) values ($1, $2)`,
    values: [libroId, autorId]
  })
  client.release()
}
module.exports = {agregar_libro, get_libros, agregar_autor, get_autores,add_libro_autor}