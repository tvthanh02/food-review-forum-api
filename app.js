const express = require('express');
require('dotenv').config();
const app = express();

app.use('/api/v1', (_, res) => {
  res.send('<p>Hello world</p>');
});

module.exports = app;
