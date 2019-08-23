'use strict';
const express = require('express');
const router = express.Router();
const mensajeApi = require('./mensajes.api');

router.route('/registrar_mensaje')
    .post(function(req , res){
        mensajeApi.registrar(req , res);
});
module.exports = router;