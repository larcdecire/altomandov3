'use strict';

var contactModel = require('../../../models/contact');

module.exports = function (router) {

    router.get('/:id' ,function (req, res, next) {

        var contactId = req.params.id;

        contactModel.findOne({_id: contactId})
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

        contactModel.find()
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

        var newContact = new contactModel(data);

        newContact.save(function (err, personCreated) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }
            res.status(201).json(personCreated).end();
        });

    });

    router.put('/:id',  function (req, res, next) {

        var data = req.body;
        var contactId = req.params.id;

        contactModel.findOne({_id: contactId}, function (err, contactToUpdate) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }

            mapPersonDataToUpdate(contactToUpdate, data);
            contactToUpdate.save(function (err, contactToUpdate) {
                if (err) {
                    return res.status(500).json({error: err}).end();
                }
                res.status(201).json(contactToUpdate).end();
            });
        });

    });

    router.delete('/:id', function (req, res, next) {

        var contactId = req.params.id;

        contactModel.remove({_id: contactId}, function (err) {
            if (err) {
                res.status(500).json({error: err}).end();
            }

            res.status(204).end();
        });

    });

    function mapPersonDataToUpdate(contactToUpdate, data) {

        contactToUpdate.name = data.name || contactToUpdate.name;
        contactToUpdate.age = data.age || contactToUpdate.age;
        contactToUpdate.cellphoneNumber = data.cellphoneNumber || contactToUpdate.cellphoneNumber;
        contactToUpdate.description = data.description || contactToUpdate.description;

        return contactToUpdate;

    };

};
