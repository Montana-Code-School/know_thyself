var app = require('./app');
var debug = require('debug')('backend:server');
var http = require('http');
var express = require('express');

var port = normalizePort(process.env.PORT || '4001');
app.set('port', port);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}

var server = http.createServer(app);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

var expressServerUtils = require('express-server-utils')(server, port);
expressServerUtils.listen();
expressServerUtils.handleOnError();
expressServerUtils.handleOnListening();

const exitActions = [server.close];
expressServerUtils.handleShutDown(exitActions);
