const express = require('express')

const router = express.Router()

const users = [
  {
    name: 'Hugo Muñoz',
    password: '12345',
    email: 'hugo@gmail.com'
  },
  {
    name: 'Paula Inzunza',
    password: '54321',
    email: 'paula@gmail.com'
  },
  {
    name: 'Carlos Horta',
    password: '98765',
    email: 'carlos@gmail.com'
  }
] 

// RUTAS
router.get('/', (req, res) => {
  res.render('index.html')
})

router.get('/login', (req, res) => {
  res.render('login.html')
})

router.post('/login', (req, res) => {
  // 0. Recuperamos los campos del formulario
  const email = req.body.email
  const password = req.body.password

  // 1. Revisamos si efectivamente existe el usuario

  const user_encontrado = users.find( function(us) { return us.email == email } )
  if (!user_encontrado) {
    return res.send('Usuario inexistente o contraseña incorrecta')
  }
  //  2. Revisamos que las contraseñas coincidan
  if (user_encontrado.password != password) {
    return res.send('Usuario inexistente o contraseña incorrecta')
  }

  // 3. Redirigir al usuario al Home
  res.redirect('/')
})

router.get('/register', (req, res) => {
  res.render('register.html')
})

module.exports = router