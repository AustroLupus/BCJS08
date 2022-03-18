const express = require('express')
const axios = require('axios')
const nunjucks = require('nunjucks')

const app =express()
app.use(express.static('static'))

//se configura nunjucks
nunjucks.configure("templates",{
    express: app,
    autoescape: true,
    noCache:false,
    watch:true
})