
const { Server } = require('@webserverless/fc-express')
const express = require('express');

const app = express();
app.all(/.*/, (req, res) => {
  res.send('hello world!');
});

const server = new Server(app);

// http trigger entry
module.exports.handler = function(req, res, context) {
  server.httpProxy(req, res, context);
};

// api gateway entry
// module.exports.handler = function(event, context, callback) {
//   server.proxy(event, context, callback);
// };