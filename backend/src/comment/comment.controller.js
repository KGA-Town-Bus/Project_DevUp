const {CommentCreateRequestDTO} = require("./dto/comment.create.request.dto");
const {Created, OK} = require("../lib/customMessage");

class CommentController {
  constructor(service) {
    this.service = service
  }

  async getComments(req, res, next) {
    try {
      const commentListResponseDTO = await this.service.commentList(req.query.post, req.query.page)

      res.status(200).json(new OK(commentListResponseDTO))
    } catch (e) {
      next(e)
    }
  }

  async postComment(req, res, next) {
    try {
      const commentCreateRequestDTO = new CommentCreateRequestDTO(req)
      const result = await this.service.createComment(commentCreateRequestDTO)

      return res.status(201).json(new Created(result))
    } catch (e) {
      next(e)
    }

  }
}

module.exports = CommentController