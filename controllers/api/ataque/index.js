'use strict';

var jwtGenerator = require('../../../lib/jwt-generator');
var auth = require('../../../lib/auth');

var atacaModel = require('../../../models/ataque');

module.exports = function (router) {

    router.get('/:id',  function (req, res, next) {

        var ataqueId = req.params.id;

        atacaModel.findOne({_id: ataqueId})
        .populate('user')
        .exec(function (err, person) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }
            if (!person) {
                return res.status(404).end();
            }
            res.status(200).json(person).end();
        });

    });

    router.get('/',  function (req, res, next) {

        atacaModel.find()
        .populate('user')
        .exec(function (err, person) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }
            if (!person) {
                return res.status(404).end();
            }
            res.status(200).json(person).end();
        });

    });

    router.post('/',  function (req, res, next) {

        var data = req.body;

        var newAtaque = new atacaModel(data);

        newAtaque.save(function (err, personCreated) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }
            res.status(201).json(personCreated).end();
        });

    });

    router.put('/:id',  function (req, res, next) {

        var data = req.body;
        var ataqueId = req.params.id;

        atacaModel.findOne({_id: ataqueId}, function (err, ataqueToUpdate) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }

            mapPersonDataToUpdate(ataqueToUpdate, data);
            ataqueToUpdate.save(function (err, ataqueToUpdate) {
                if (err) {
                    return res.status(500).json({error: err}).end();
                }
                res.status(201).json(ataqueToUpdate).end();
            });
        });

    });

    router.delete('/:id',  function (req, res, next) {

        var ataqueId = req.params.id;

        atacaModel.remove({_id: ataqueId}, function (err) {
            if (err) {
                res.status(500).json({error: err}).end();
            }

            res.status(204).end();
        });

    });

    function mapPersonDataToUpdate(ataqueToUpdate, data) {

        ataqueToUpdate.codigo_escuadron = data.codigo_escuadron || ataqueToUpdate.codigo_escuadron;
        ataqueToUpdate.p_exito = data.p_exito || ataqueToUpdate.p_exito;
        ataqueToUpdate.cod_objMilitar = data.cod_objMilitar || ataqueToUpdate.cod_objMilitar;

        return ataqueToUpdate;

    };

};
