const http = require('http');
const app = require('./app');
const process = require('node:process');

const PORT = process.env.HOST_PORT || 8000;
const server = http.createServer(app);

server.listen(PORT, () => console.log('server is running on port ' + PORT));
