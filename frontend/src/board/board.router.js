const express = require('express');
const boardRouter = express.Router();
const {boardController} = require('./board.module');

const getMainPage = boardController.getMainPage.bind(boardController);
const getCreate = boardController.getCreate.bind(boardController);
const postCreate = boardController.postCreate.bind(boardController);
const getOnePost = boardController.getOnePost.bind(boardController);
const getModify = boardController.getModify.bind(boardController);
const postDelete = boardController.postDelete.bind(boardController);
const postLike = boardController.postLike.bind(boardController);

boardRouter.get('/', getMainPage);
boardRouter.get('/create', getCreate);
boardRouter.post('/create', postCreate);
boardRouter.get('/modify/:postUid', getModify);
boardRouter.get('/posts/:postUid', getOnePost);
boardRouter.delete('/posts/:postUid', postDelete);
boardRouter.post('/posts/:postUid/like', postLike);

module.exports = boardRouter;
