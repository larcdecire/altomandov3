'use strict';
var jwtGenerator = require('../../../../lib/jwt-generator');
var auth = require('../../../../lib/auth');
var UserModel = require('../../../../models/userclase13');

module.exports = function (router) {

    router.use('/', auth.isAuthenticated(), function (req, res, next) {
        next();
    });

    router.get('/', function (req, res) {

        return res.status(200).json({result: 'Todo OK!'}).end();

    });
};
