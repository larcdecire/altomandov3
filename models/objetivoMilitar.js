'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var objetivoMilitarSchema = new Schema({

    codigo: {type: String, trim: true, required: true},
    nombre: {type: String, trim: true, required: true},
    latitud: {type : Number, trim: true, required: true},
    longitud: {type : Number, trim: true, required: true},
    prioridad: {type : String, trim: true, required: true}
});


module.exports = mongoose.model('obj_Militar', objetivoMilitarSchema);
