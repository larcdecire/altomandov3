'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({


    nombre: {type: String, trim: true, required: true},
    apellido: {type: String, trim: true, required: true},
    nivelMilitar: {type: String, enum: ['soldado', 'oficial', 'capitan', 'general'],lowercase: true, trim: true, required: true},
    edad: {type: Number,trim: true, required: true},
    habilitado: {type: String, enum: ['si','no'] ,required: true},
    username : {type: String, trim: true, required: true},
    password : {type: String, trim: true, required:  true}
});

module.exports = mongoose.model('User', userSchema);
