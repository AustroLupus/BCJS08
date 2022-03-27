const express = require('express')
const { get_messages, get_comments
} = require('../db.js')

const router = express.Router()

function protected_route (req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login')
  }
  next()
}

// RUTAS
router.get('/', protected_route, async (req, res) => {
  const messages = await get_messages()
  const comments = await get_comments()
  res.render('index.html',{messages, comments})
})

router.get('/seguidos', protected_route, (req, res) => {
  res.render('seguidos.html')
})

module.exports = router