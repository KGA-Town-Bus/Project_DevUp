const express = require('express');
const app = express();
const router = require('./src/index');
const {swaggerUi, frontSpecs} = require('./swagger/swagger');
const nunjucks = require('nunjucks');

app.set('view engine', 'html');
nunjucks.configure('frontend/views', {express: app});

app.use(express.static('frontend/public'));
app.use(express.json());
app.use(router);
app.use(
  '/api-docs',
  swaggerUi.serveFiles(frontSpecs),
  swaggerUi.setup(frontSpecs, {explorer: true}),
);

module.exports = app;
