const middleware = require('./middleware');
const debug = require('debug')('backend:server');
const http = require('http');
const express = require('express');

let port = normalizePort(process.env.PORT || '4001');
middleware.set('port', port);
if (process.env.NODE_ENV === "production") {
  middleware.use(express.static("frontend/build"));
}

let server = http.createServer(middleware);

function normalizePort(val) {
    let port = parseInt(val, 10);

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

let expressServerUtils = require('express-server-utils')(server, port);
expressServerUtils.listen();
expressServerUtils.handleOnError();
expressServerUtils.handleOnListening();

const exitActions = [server.close];
expressServerUtils.handleShutDown(exitActions);
