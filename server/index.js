const jsonServer = require('json-server');
const server = jsonServer.create();
const setupApi = require('./api-server');

setupApi(server);

server.listen(3000, () => {
  console.log('JSON Server is running');
});

module.exports = server;
