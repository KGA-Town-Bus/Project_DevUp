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

boardRouter.post('/', postCreate);
boardRouter.get('/', getAllPost);
boardRouter.get('/:uid', getPost);
boardRouter.put('/:uid', putUpdatePost);
boardRouter.delete('/:uid', deletePost);
boardRouter.post('/:uid/like', postLiked);
boardRouter.delete('/:uid/like', deleteLiked);

module.exports = boardRouter;
