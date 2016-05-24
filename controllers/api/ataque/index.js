'use strict';

var PersonModel = require('../../../models/person');

module.exports = function (router) {

    router.get('/:id', function (req, res) {

        var ataqueId = req.params.id;

        PersonModel.findOne({_id: ataqueId})
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

        var newAtaque = new PersonModel(data);

        newAtaque.save(function (err, personCreated) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }
            res.status(201).json(personCreated).end();
        });

    });

    router.put('/:id', function (req, res) {

        var data = req.body;
        var ataqueId = req.params.id;

        PersonModel.findOne({_id: ataqueId}, function (err, ataqueToUpdate) {
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

    router.delete('/:id', function (req, res) {

        var ataqueId = req.params.id;

        PersonModel.remove({_id: ataqueId}, function (err) {
            if (err) {
                res.status(500).json({error: err}).end();
            }

            res.status(204).end();
        });

    });

    function mapPersonDataToUpdate(ataqueToUpdate, data) {

        ataqueToUpdate.name = data.name || ataqueToUpdate.name;
        ataqueToUpdate.lastName = data.lastName || ataqueToUpdate.lastName;
        ataqueToUpdate.day = data.day || ataqueToUpdate.day;
        ataqueToUpdate.desc = data.desc || ataqueToUpdate.desc;

        return ataqueToUpdate;

    };

};
