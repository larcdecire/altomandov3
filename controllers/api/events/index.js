'use strict';

var PersonModel = require('../../../models/evento');

module.exports = function (router) {

    router.get('/:id', function (req, res) {

        var eventId = req.params.id;

        PersonModel.findOne({_id: eventId})
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

        var newEvent = new PersonModel(data);

        newEvent.save(function (err, personCreated) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }
            res.status(201).json(personCreated).end();
        });

    });

    router.put('/:id', function (req, res) {

        var data = req.body;
        var eventId = req.params.id;

        PersonModel.findOne({_id: eventId}, function (err, eventToUpdate) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }

            mapPersonDataToUpdate(eventToUpdate, data);
            eventToUpdate.save(function (err, eventToUpdate) {
                if (err) {
                    return res.status(500).json({error: err}).end();
                }
                res.status(201).json(eventToUpdate).end();
            });
        });

    });

    router.delete('/:id', function (req, res) {

        var eventId = req.params.id;

        PersonModel.remove({_id: eventId}, function (err) {
            if (err) {
                res.status(500).json({error: err}).end();
            }

            res.status(204).end();
        });

    });

    function mapPersonDataToUpdate(eventToUpdate, data) {

        eventToUpdate.hr = data.hr || eventToUpdate.hr;
        eventToUpdate.categoria = data.categoria || eventToUpdate.categoria;
        eventToUpdate.day = data.day || eventToUpdate.day;
        eventToUpdate.desc = data.desc || eventToUpdate.desc;

        return eventToUpdate;

    };

};
