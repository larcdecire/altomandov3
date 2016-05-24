'use strict';

var UserModel = require('../../../models/user');

module.exports = function (router) {

    router.get('/:id', function (req, res) {

        var userId = req.params.id;

        UserModel.find({_id: userId}, function (err, user) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }
            if (!user) {
                return res.status(404).end();
            }
            res.status(200).json(user).end();
        });

    });

    router.get('/', function (req, res) {

        UserModel.find({}, function (err, users) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }
            res.status(200).json(users).end();
        });

    });

    router.post('/', function (req, res) {

        var data = req.body;

        var newUser = new UserModel(data);

        newUser.save(function (err, userCreated) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }
            res.status(201).json(userCreated).end();
        });

    });

    router.put('/:id', function (req, res) {

        var data = req.body;
        var userId = req.params.id;

        UserModel.findOne({_id: userId}, function (err, userToUpdate) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }

            mapUserDataToUpdate(userToUpdate, data);
            userToUpdate.save(function (err, userCreated) {
                if (err) {
                    return res.status(500).json({error: err}).end();
                }
                res.status(201).json(userCreated).end();
            });
        });

    });

    router.delete('/:id', function (req, res) {

        var userId = req.params.id;

        UserModel.remove({_id: userId}, function (err) {
            if (err) {
                res.status(500).json({error: err}).end();
            }

            res.status(204).end();
        });

    });

    function mapUserDataToUpdate(userToUpdate, data) {

        userToUpdate.nombre = data.nombre || userToUpdate.nombre;
        userToUpdate.apellido = data.apellido || userToUpdate.apellido;
        userToUpdate.nivelMilitar = data.nivelMilitar || userToUpdate.nivelMilitar;
        userToUpdate.edad = data.edad || userToUpdate.edad;
        userToUpdate.habilitado = data.habilitado || userToUpdate.habilitado;

        return userToUpdate;

    };

};
