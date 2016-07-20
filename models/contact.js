'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contactSchema = new Schema({

    name: {type: String, trim: true, required: true},
    age:{type: Number, trim: true, min:0, max: 130, required: true},
    cellphoneNumber: {type: String, trim: true, required: true},
    description: {type: String, trim: true, required: true}
});


module.exports = mongoose.model('contact', contactSchema);
