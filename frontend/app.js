const express = require('express');
const app = express();
const router = require('./src/index');
const {swaggerUi, frontSpecs} = require('./swagger/swagger');
const nunjucks = require('nunjucks');
const {auth} = require("./src/lib/jwtAuthMiddleware");
const cookieParser = require("cookie-parser");


app.set('view engine', 'html');
nunjucks.configure('frontend/views', {express: app});

app.use(express.static('frontend/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(auth)


app.use(router);
app.use(
  '/api-docs',
  swaggerUi.serveFiles(frontSpecs),
  swaggerUi.setup(frontSpecs, {explorer: true}),
);

module.exports = app;
