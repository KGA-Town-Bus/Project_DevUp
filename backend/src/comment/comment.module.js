const CommentService = require("./comment.service")
const CommentController = require("./comment.controller")
const db = require("../lib/db")

const {Comments} = db

const commentService = new CommentService(Comments)
const commentController = new CommentController(commentService)

module.exports = {
  commentController
}
