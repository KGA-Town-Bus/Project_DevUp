const express = require('express');
const boardRouter = express.Router();
const {boardController} = require('./board.module');
const getPosts = boardController.getPosts.bind(boardController);
const postCreate = boardController.postCreate.bind(boardController);

boardRouter.get('/', getPosts);
boardRouter.get('/:uid');
boardRouter.post('/', postCreate);

module.exports = boardRouter;
