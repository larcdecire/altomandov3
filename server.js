'use strict';

var app = require('./index');
var http = require('http');

var server;

/*
 * Create and start HTTP server.
 */
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
server = http.createServer(app);
server.listen(port, ip);
server.on('listening', function () {
    console.log('Server listening on http://localhost:%d', this.address().port);
});
