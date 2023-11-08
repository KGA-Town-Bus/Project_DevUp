const express = require('express');
const boardRouter = express.Router();
const BoardService = require('./board.service');
const BoardController = require('./board.controller');
const boardService = new BoardService();
const boardController = new BoardController(boardService);

const getPosts = boardController.getPosts.bind(boardController);
const getCreate = boardController.getCreate.bind(boardController);
const postCreate = boardController.postCreate.bind(boardController);
const getOnePost = boardController.getOnePost.bind(boardController);
const getModify = boardController.getModify.bind(boardController);
const putUpdate = boardController.putUpdate.bind(boardController);
const postDelete = boardController.postDelete.bind(boardController);
const postLike = boardController.postLike.bind(boardController);

boardRouter.get('/', getPosts);
boardRouter.get('/create', getCreate);
boardRouter.post('/create', postCreate);
boardRouter.put('/posts/:postUid', putUpdate);
boardRouter.get('/modify/:postUid', getModify);
boardRouter.get('/posts/:postUid', getOnePost);
boardRouter.delete('/posts/:postUid', postDelete);
boardRouter.post('/posts/:postUid/like', postLike);

module.exports = boardRouter;
