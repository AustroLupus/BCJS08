const moment = require('moment')
moment.locale('es-mx')
async function process_money(origen){
    if (origen == 'granja'){
        let ganancia = (Math.floor(Math.random()*10))+10
        return llenaMovida(ganancia,origen,moment().format('lll'))
    }else if (origen == 'cueva'){
        let ganancia = (Math.floor(Math.random()*5))+5
        return llenaMovida(ganancia,origen,moment().format('lll'))
    }else if (origen == 'casa'){
        let ganancia = (Math.floor(Math.random()*2))+3
        return llenaMovida(ganancia,origen,moment().format('lll'))
    }else if (origen == 'casino'){
        let ganancia = (Math.round(Math.random()) * 2 - 1)*(Math.floor(Math.random()*50))
        return llenaMovida(ganancia,origen,moment().format('lll'))
    }else{
        return
    }
}

function llenaMovida(ganancia,lugar,hora){
    let movida = {ganancia:'',lugar:'', hora:''}
    movida.ganancia = ganancia
    movida.lugar=lugar
    movida.hora = hora
    return movida
}

module.exports = {process_money}