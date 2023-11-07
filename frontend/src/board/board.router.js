const express = require('express');
const boardRouter = express.Router();
const BoardService = require('./board.service');
const BoardController = require('./board.controller');
const boardService = new BoardService();
const boardController = new BoardController(boardService);

// 바인딩을 위해 컨트롤러의 메소드를 변수에 할당합니다.
const getPosts = boardController.getPosts.bind(boardController);
const postCreate = boardController.postCreate.bind(boardController);
const getOnePost = boardController.getOnePost.bind(boardController);
const postUpdate = boardController.postUpdate.bind(boardController);
const postDelete = boardController.postDelete.bind(boardController);
const postLike = boardController.postLike.bind(boardController);

// 라우트 설정
boardRouter.get('/', getPosts);
boardRouter.get('/:postUid', getOnePost);
boardRouter.post('/', postCreate);
boardRouter.patch('/:postUid', postUpdate);
boardRouter.delete('/:postUid', postDelete);
boardRouter.post('/:postUid/like', postLike);

module.exports = boardRouter;
