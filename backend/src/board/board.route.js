const express = require('express');
const boardRouter = express.Router();

const {boardController} = require('./board.module');
const postCreate = boardController.postCreate.bind(boardController);
const getAllPost = boardController.getAllPost.bind(boardController);
const getPost = boardController.getPost.bind(boardController);
const putUpdatePost = boardController.putUpdatePost.bind(boardController);
const deletePost = boardController.deletePost.bind(boardController);

module.exports = boardRouter;
