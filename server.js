const express = require('express');
require('dotenv').config();
const process = require('node:process');
const app = express();

const PORT = process.env.HOST_PORT ?? 8000;

app.use('/', (_, res) => {
  res.send('<p>Hello world</p>');
});

app.listen(PORT, () => console.log('server is running on port ' + PORT));
