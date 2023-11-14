const express = require('express');
const commentRouter = express.Router();

const {commentController} = require('./comment.module');
const getComments = commentController.getComments.bind(commentController)
const postComment = commentController.postComment.bind(commentController)



commentRouter.get("/", getComments)
commentRouter.post("/", postComment)

module.exports = commentRouter;
