const express = require('express')
const nunjucks = require('nunjucks')
const crypto = require('crypto')
const session = require('express-session')
const {process_money} = require('./db.js')

const app = express()
const PORT = 3000
let laGanancia
let elLugar
let laHora
let mensaje


// Configuraciones estáticos
app.use(express.static('static'))
app.use(express.static('node_modules/bootstrap/dist'))
app.use(express.static('node_modules/axios/dist'))

// se configura nunjucks
nunjucks.configure("templates", {
  express: app,
  autoscape: true,
  watch: true,
});

// configuraciones de formulario
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// configuración de sessiones
app.use(session({
  secret: 'mi-clave',
  cookie: { maxAge: 86400000 }
}))

app.get('/random', (req, res) => {

    if (!req.session.intentos) {
      req.session.intentos = 0
    }
    req.session.intentos += 1
    const palabra = crypto.randomBytes(7).toString('hex')
  
    res.render('random.html', {palabra, intentos: req.session.intentos})
});
  
app.get('/random/reset', (req, res) => {
    req.session.intentos = 0
    res.redirect('/random')
});

app.get('/gold', (req, res) => {
    if (!req.session.oros) {
        req.session.oros = 0
        mensaje=''
    }
    if (!req.session.mensajes){
        req.session.mensajes = []
    }
    res.render('gold.html',{oros:req.session.oros,mensaje,mensajes:req.session.mensajes})
});

app.post('/gold/process_money', async (req, res) => {
    //req.session.oros += await process_money(req.body.origen)
    let miRetorno = await process_money(req.body.origen)
    console.log(miRetorno);
    req.session.mensajes.push(miRetorno)
    req.session.oros += miRetorno.ganancia
    laGanancia=miRetorno.ganancia
    laHora=miRetorno.hora
    if(miRetorno.lugar == 'casino'){
        elLugar='el casino'
    }else{
        elLugar=`la ${miRetorno.lugar}`
    }
    if(laGanancia>0){
        mensaje +=`Gano ${laGanancia} oros desde ${elLugar} (${laHora}) \n`
    }else if(laGanancia<0){
        mensaje +=`Perdió ${(laGanancia)*-1} oros desde ${elLugar} (${laHora}) \n`
    }else{
        mensaje +=`No enconto oros en ${elLugar} (${laHora}) \n`
    }
    res.redirect('/gold')
});
app.get('/gold/mata', (req,res)=>{
    req.session.oros =0
    mensaje=''
    req.session.mensajes = []
    res.redirect('/gold')
})

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))