const http = require('http');
const https = require('https');

const app = require('./app');
require('dotenv').config();
const process = require('node:process');

const HTTP_PORT =
  process.env.NODE_ENV === 'production'
    ? process.env.HOST_HTTP_PORT_PROD
    : process.env.HOST_HTTP_PORT;
const HTTPS_PORT =
  process.env.NODE_ENV === 'production'
    ? process.env.HOST_HTTPS_PORT_PROD
    : process.env.HOST_HTTPS_PORT;

const httpServer = http.createServer(app);
const httpsServer = https.createServer(
  {
    key: process.env.SSL_KEY,
    cert: process.env.SSL_CERT,
  },
  app
);

httpServer.listen(HTTP_PORT, () =>
  console.log('HTTP server is running on port ' + HTTP_PORT)
);
httpsServer.listen(HTTPS_PORT, () =>
  console.log('HTTPS server is running on port ' + HTTPS_PORT)
);
