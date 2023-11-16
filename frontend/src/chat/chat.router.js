const express = require('express');
const chatRouter = express.Router();

require('dotenv').config();

const BACKEND_SERVER_IP = process.env.BACKEND_SERVER_IP;
const BACKEND_SERVER_PORT = process.env.BACKEND_SERVER_PORT;
const PROTOCOL = process.env.PROTOCOL;

const backServer = {
  PROTOCOL,
  BACKEND_SERVER_IP,
  BACKEND_SERVER_PORT,
};

chatRouter.get('/', (req, res) => {
  if (!req.user || !req.user.Users_uid) {
    return res.redirect('/users/login');
  }
  const user = req.user;
  res.render('chat/client.html', {user, backServer});
});

module.exports = chatRouter;
