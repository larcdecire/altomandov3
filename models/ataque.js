'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ataqueSchema = new Schema({

    codigo_escuadron: {type: String,enum:['SF', 'RT', 'HM'], trim: true, required: true},
    p_exito:{type: Number, trim: true, required: true},
    cod_objMilitar: {type: String, trim: true, required: true}
});


module.exports = mongoose.model('obj_Militar', ataqueSchema);
