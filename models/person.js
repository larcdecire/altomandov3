'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var personSchema = new Schema({

    name: {type: String, trim: true, required: true},
    lastName: {type: String, trim: true, required: true},
    user: {type : mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Person', personSchema);
