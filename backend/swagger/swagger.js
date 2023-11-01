const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  swaggerDefinition: {
    openapi: "3.0.3",
    info: {
      title: 'BackEnd Swagger',
      version: '1.0.0',
      description: 'a Rest api using swagger and express.',
    },
    servers: [

      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: [`${__dirname}/../src/*.js`, `${__dirname}/../src/routes/*.js`, `${__dirname}/../src/models/*.js`]

}

const backSpecs = swaggerJsdoc(options);

module.exports = {swaggerUi, backSpecs}
