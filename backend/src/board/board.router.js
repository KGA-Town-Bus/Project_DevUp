const express = require('express');
const boardRouter = express.Router();
const {boardController} = require('./board.module');

const postCreate = boardController.postCreate.bind(boardController);
const getAllPost = boardController.getAllPost.bind(boardController);
const getPost = boardController.getPost.bind(boardController);
const putUpdatePost = boardController.putUpdatePost.bind(boardController);
const deletePost = boardController.deletePost.bind(boardController);
const postLiked = boardController.postLiked.bind(boardController);
const deleteLiked = boardController.deleteLiked.bind(boardController);

boardRouter.post('/create', postCreate);
boardRouter.get('/', getAllPost);
boardRouter.get('/:postUid', getPost);
boardRouter.put('/posts/:postUid', putUpdatePost);
boardRouter.delete('/posts/:postUid', deletePost);
boardRouter.post('/:postUid/like', postLiked);
boardRouter.delete('/:postUid/like', deleteLiked);

module.exports = boardRouter;
