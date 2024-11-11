const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Food Review Forum - OpenAPI 3.0',
      termsOfService: 'http://swagger.io/terms/',
      contact: {
        email: 'tvthanhdev02@gmail',
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
      version: '1.0.11',
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
      {
        url: 'https://food-review-forum-api.onrender.com',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['src/api/routes/*.js', 'swagger.schemas.js'],
};

module.exports = swaggerJsdoc(options);
