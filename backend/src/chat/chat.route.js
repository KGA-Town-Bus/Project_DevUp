const express = require('express');
const chatRouter = express.Router();
const io = require('../../../index');

chatRouter.use('/', (req, res) => {
  io.on('connection', socket => {
    console.log('a user connected');
  });
});

module.exports = chatRouter;
