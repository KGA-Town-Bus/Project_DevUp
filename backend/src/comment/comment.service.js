const {CommentListResponseDTO} = require("./dto/comment.list.response.dto");
const db = require("../lib/db")
const {Logger} = require("sequelize/lib/utils/logger");
const {CommentResponseDTO} = require("./dto/comment.response.dto");

class CommentService {
  constructor(Comment) {
    this.commentRepository = Comment
  }

  async commentList(postUid) {

    const commentList = await this.commentRepository.findAll({
      include: [{
        model: db.Users,
        attributes: ["Users_nickname"]
      }],
      where: {
        Posts_uid: postUid
      }
    })

    return commentList.map((comment) => {
      return new CommentListResponseDTO(comment.dataValues)
    })
  }

  async createComment(requestDTO) {
    try {

      const {dataValues: result} = await this.commentRepository.create({
        Posts_uid: requestDTO.postUid,
        Users_uid: requestDTO.userUid,
        Comments_content: requestDTO.commentContent,
        Comments_uid2: null
      })

      const {dataValues} = await this.commentRepository.findOne({
        include: {
          model : db.Users,
          attributes: ["Users_nickname"]
        },
        where: {
          Comments_uid: result.Comments_uid
        },
      })

      const comment = new CommentResponseDTO(dataValues)
      return comment
    } catch (e) {
      throw e
    }
  }

}

module.exports = CommentService