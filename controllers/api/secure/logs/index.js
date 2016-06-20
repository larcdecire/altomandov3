'use strict';
var jwtGenerator = require('../../../../lib/jwt-generator');
var auth = require('../../../../lib/auth');
var UserModel = require('../../../../models/userclase13');

module.exports = function (router) {
    
    //utiliza cualquier tipo de solicitud GET/POST/PUT/DELETE
    router.use('/', auth.isAuthenticated(), function (req, res, next) {
        next();
    });

    router.get('/', function (req, res) {
        
        
        var vtoken = req.headers['x-access-token'];
        return res.status(200).json({result: 'Todo OK!', token: vtoken}).end();

    });
};
