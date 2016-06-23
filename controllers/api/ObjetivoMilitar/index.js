'use strict';

var auth = require('../../../lib/auth');
var ObjMilitarModel = require('../../../models/objetivoMilitar');

module.exports = function (router) {

    router.get('/:id', auth.isAuthenticated(),function (req, res, next) {

        var objId = req.params.id;

        ObjMilitarModel.findOne({_id: objId})
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
    
    router.get('/:lat/:lon', auth.isAuthenticated(),function (req, res, next) {

        var lat = req.params.lat;
        var lon = req.params.lon;

        ObjMilitarModel.findOne({latitud: lat, longitud: lon})
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

    router.get('/', auth.isAuthenticated(),  function (req, res, next) {

        ObjMilitarModel.find()
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

    router.post('/', auth.isAuthenticated(),  function (req, res, next) {

        var data = req.body;

        var newObj = new ObjMilitarModel(data);

        newObj.save(function (err, personCreated) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }
            res.status(201).json(personCreated).end();
        });

    });

    router.put('/:id', auth.isAuthenticated(),  function (req, res, next) {

        var data = req.body;
        var objId = req.params.id;

        ObjMilitarModel.findOne({_id: objId}, function (err, objToUpdate) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }

            mapPersonDataToUpdate(objToUpdate, data);
            objToUpdate.save(function (err, objToUpdate) {
                if (err) {
                    return res.status(500).json({error: err}).end();
                }
                res.status(201).json(objToUpdate).end();
            });
        });

    });

    router.delete('/:id', function (req, res, next) {

        var objId = req.params.id;

        ObjMilitarModel.remove({_id: objId}, function (err) {
            if (err) {
                res.status(500).json({error: err}).end();
            }

            res.status(204).end();
        });

    });

    function mapPersonDataToUpdate(objToUpdate, data) {

        objToUpdate.codigo = data.codigo || objToUpdate.codigo;
        objToUpdate.nombre = data.nombre || objToUpdate.nombre;
        objToUpdate.latitud = data.latitud || objToUpdate.latitud;
        objToUpdate.longitud = data.longitud || objToUpdate.longitud;
        objToUpdate.prioridad = data.prioridad || objToUpdate.prioridad;
        
        return objToUpdate;

    };

};
