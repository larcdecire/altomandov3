'use strict';

var PersonModel = require('../../../models/person');

module.exports = function (router) {

    router.get('/:id', function (req, res) {

        var objId = req.params.id;

        PersonModel.findOne({_id: objId})
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

    router.get('/', function (req, res) {

        PersonModel.find()
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

    router.post('/', function (req, res) {

        var data = req.body;

        var newObj = new PersonModel(data);

        newObj.save(function (err, personCreated) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }
            res.status(201).json(personCreated).end();
        });

    });

    router.put('/:id', function (req, res) {

        var data = req.body;
        var objId = req.params.id;

        PersonModel.findOne({_id: objId}, function (err, objToUpdate) {
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

    router.delete('/:id', function (req, res) {

        var objId = req.params.id;

        PersonModel.remove({_id: objId}, function (err) {
            if (err) {
                res.status(500).json({error: err}).end();
            }

            res.status(204).end();
        });

    });

    function mapPersonDataToUpdate(objToUpdate, data) {

        objToUpdate.name = data.name || objToUpdate.name;
        objToUpdate.lastName = data.lastName || objToUpdate.lastName;
        objToUpdate.day = data.day || objToUpdate.day;
        objToUpdate.desc = data.desc || objToUpdate.desc;

        return objToUpdate;

    };

};
