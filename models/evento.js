'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventoSchema = new Schema({

    hr: {type: String, trim: true, required: true},
    categoria: {type: String, enum: ['error', 'info', 'warning'], trim: true, required: true},
    day: {type : Date, trim: true, required: true},
    desc: {type: String, trim: true, required: true}
});


module.exports = mongoose.model('event', eventoSchema);
