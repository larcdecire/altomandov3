'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ataqueSchema = new Schema({

    codigoEscuadron: {type: String,enum:['SF', 'RT', 'HM'], trim: true, required: true},
    pExito:{type: Number, trim: true, min:0, max: 100, required: true},
    codObjMilitar: {type: String, trim: true, required: true},
    mensaje: {type: String, trim: true, required: true}
});


module.exports = mongoose.model('ataque', ataqueSchema);
