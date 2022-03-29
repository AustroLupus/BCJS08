const express = require('express')
const {add_question,get_preguntas,shuffle
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
  //const messages = await get_messages()
  //const comments = await get_comments()
  //res.render('index.html',{messages, comments})
  res.render('index.html')
})

router.get('/agregar_pregunta', protected_route, (req, res) => {
  const notices = req.flash('notices')
  res.render('agregar_pregunta.html', { notices })
})

router.get('/jugar', protected_route, async (req, res) => {
  let preguntas = await get_preguntas()
  let nuevoObjeto=[]
  for (let pregunta of preguntas) {
    let array1=[]
    let obj1={}
    array1.push(pregunta.answer)
    array1.push(pregunta.fake_one)
    array1.push(pregunta.fake_two)
    shuffle(array1)
    obj1={id:pregunta.id,
      question:pregunta.question,
      p1:array1[0],
      p2:array1[1],
      p3:array1[2]}
    nuevoObjeto.push(obj1)

  }
  //console.log(nuevoObjeto)
  res.render('jugar.html', {nuevoObjeto})
})

router.post('/crear_pregunta', protected_route, async (req, res) => {
  //console.log(req.body)>
  await add_question(req.body.pregunta, req.body.respCorrecta, req.body.respFalsa1,req.body.respFalsa2)
  req.flash('notices', 'Pregunta Creada')
  res.redirect('/agregar_pregunta')
});

router.post('/enviar_respuestas', protected_route, async (req, res) => {
  console.log(req.body)
    res.redirect('/jugar')
});

module.exports = router