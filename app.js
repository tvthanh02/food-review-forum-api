const express = require('express');
require('dotenv').config();
const app = express();
const connectDB = require('./src/config/database');
const router = require('./src/api/routes');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/config/swagger');

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// connect database
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

module.exports = app;
