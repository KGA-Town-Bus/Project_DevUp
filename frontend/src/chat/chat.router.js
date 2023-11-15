const express = require('express');
const chatRouter = express.Router();

chatRouter.get('/', (req, res) => {
  const user = req.user;
  res.render('chat/client.html', {user});
});

module.exports = chatRouter;
