const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  swaggerDefinition: {
    openapi: "3.0.3",
    info: {
      title: 'Express Service with Swagger',
      version: '1.0.0',
      description: 'a Rest api using swagger and express.', // 프로젝트 설명
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
      {
        url: "http://localhost:4000",
      },

    ],
  },
  apis: ['./backend/src/*.js', './backend/src/routes/*.js', './backend/src/models/*.js',
    './frontend/src/*.js', './frontend/src/routes/*.js', './frontend/src/models/*.js']
}

const specs = swaggerJsdoc(options);

module.exports = {swaggerUi, specs}
