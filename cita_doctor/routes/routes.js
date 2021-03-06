const express = require('express')
const fs = require('fs').promises
const { create_appointment, get_appointments } = require('../db.js')

const router = express.Router()

function protected_route (req, res, next) {
  if (!req.session.user) {
    // si quiere trabajar sin rutas prptegidas, comente la siguiente línea
    return res.redirect('/login')
  }
  next()
}

// RUTAS
router.get('/', protected_route, async (req, res) => {
  const notices = req.flash('notices')
  let appointments = await get_appointments()
  console.log(appointments)
  res.render('index.html',{ notices, appointments, current_id: req.session.user.id })
})

router.get('/appointment', protected_route, (req, res) => {
  res.render('appointment.html')
})

router.post('/create_appointment', protected_route, async (req, res) => {
  //console.log(req.body)
  //console.log(req.session.user)
  //console.log("values: [user_id, date, time, complain]")
  await create_appointment(req.session.user.id, req.body.date, req.body.time, req.body.complain )
  req.flash('notices', 'Appointment created')
  res.redirect('/')
});

/* router.get('/seguidos', protected_route, async (req, res) => {
  const images = await fs.readdir('static')
  res.render('seguidos.html', { images })
})

router.post('/images', async (req, res) => {

  const image = req.files.image
  const extension = image.name.split('.')[1]

  const file_name = `${req.body.name}.${extension}`

  await image.mv(`static/${file_name}`)

  res.redirect('/')
}); */

module.exports = router
