const http = require('http');
const app = require('./app');
require('dotenv').config();
const process = require('node:process');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => console.log('Server is running on port ' + PORT));
