const express = require('express');
const app = express();
const router = require('./src/index');
const {swaggerUi, frontSpecs} = require('./swagger/swagger');
const nunjucks = require('nunjucks');
const {auth} = require("./src/lib/jwtAuthMiddleware");
const cookieParser = require("cookie-parser");
require("dotenv").config()

app.set('view engine', 'html');
nunjucks.configure('frontend/views', {express: app});
const PROTOCOL = process.env.PROTOCOL

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

app.use((error, req, res, next) => {

  if(error.errorMessage === '이미 존재하는 아이디 입니다.') return res.redirect(`${PROTOCOL}://${process.env.FRONTEND_SERVER_IP}:${process.env.FRONTEND_SERVER_PORT}/users?error=이미 존재하는 아이디 입니다.`)
  if(error.errorMessage === '비밀번호가 일치하지 않습니다.') return res.redirect(`${PROTOCOL}://${process.env.FRONTEND_SERVER_IP}:${process.env.FRONTEND_SERVER_PORT}/users/profile?error=비밀번호가 일치하지 않습니다.`)
  if(error.errorMessage === "userPassword 속성이 비어있습니다.") return res.redirect(`${PROTOCOL}://${process.env.FRONTEND_SERVER_IP}:${process.env.FRONTEND_SERVER_PORT}/users/profile?error=userPassword 속성이 비어있습니다.`)


})

module.exports = app;
