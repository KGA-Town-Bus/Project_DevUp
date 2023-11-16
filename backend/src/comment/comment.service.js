const {CommentListResponseDTO} = require("./dto/comment.list.response.dto");
const db = require("../lib/db")
const {Logger} = require("sequelize/lib/utils/logger");
const {CommentResponseDTO} = require("./dto/comment.response.dto");
const {Op} = require("sequelize");

class CommentService {
  constructor(Comment) {
    this.commentRepository = Comment
  }

  async commentList(postUid, page) {
    try {
      const pageSize = 5;
      const offset = (page - 1) * pageSize;

      const commentList = await this.commentRepository.findAll({
        include: [{
          model: db.Users,
          attributes: ["Users_nickname", "Users_profile"]
        },
          {
            model: db.Comments,
            as: "Replies",
            include: [
              {
                model: db.Users,
                attributes: ["Users_nickname", "Users_profile"]
              }
            ]
          }
        ],
        offset: offset,
        limit: pageSize,
        where: {
          Posts_uid: postUid,
          Comments_uid2: null
        },
        order: [['Comments_created_at', 'DESC']],
      })

      return commentList.map((comment) => {
        return new CommentListResponseDTO(comment.dataValues)
      })
    } catch (e) {
      throw e
    }
  }


  async createComment(requestDTO) {
    try {
      const {dataValues: result} = await this.commentRepository.create({
        Posts_uid: requestDTO.postUid,
        Users_uid: requestDTO.userUid,
        Comments_content: requestDTO.commentContent,
        Comments_uid2: requestDTO.targetUid
      })

      const {dataValues} = await this.commentRepository.findOne({
        include: {
          model: db.Users,
          attributes: ["Users_nickname", "Users_profile"]
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