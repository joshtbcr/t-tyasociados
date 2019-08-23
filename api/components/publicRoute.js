'use strict';
const express = require('express');
const router = express.Router();
/*
router.route('/')
    .get(function(req , res){
        mensajeApi.registrar(req , res);
});*/



router.get('/', function(req, res) {
    res.send(index.html);
  });

module.exports = router;