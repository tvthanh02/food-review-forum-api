const express = require('express');
require('dotenv').config();
const app = express();
const connectDB = require('./src/config/database');
const router = require('./src/api/routes');
// connect database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

module.exports = app;
