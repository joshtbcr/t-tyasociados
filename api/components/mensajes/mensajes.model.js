'use strict';
let mongoose = require('mongoose');

let mensajeSchema = new mongoose.Schema(
    {
        fecha : {type : String, required : true},
        nombre : {type : String, required : true},
        correo  : {type : String, required : true},
        mensaje : {type : String, required : true},
    }
);

module.exports = mongoose.model('Mensaje', mensajeSchema);