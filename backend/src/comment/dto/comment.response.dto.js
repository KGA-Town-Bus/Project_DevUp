const baseDTO = require("../../lib/base.dto")
const {InternalServerError} = require("../../lib/customException");


class CommentResponseDTO extends baseDTO {
  commentUid
  commentContent
  commentCreatedAt
  commentPostUid
  commentUserUid
  commentUserNickname
  commentUserProfile
  commentUid2


  constructor(comment) {
    super()
    this.commentUid = comment.Comments_uid
    this.commentContent = comment.Comments_content
    this.commentCreatedAt = comment.Comments_created_at
    this.commentPostUid = comment.Posts_uid
    this.commentUserUid = comment.Users_uid
    this.commentUid2 = comment.Comments_uid2
    this.commentUserNickname = comment.User.dataValues.Users_nickname
    this.commentUserProfile = comment.User.dataValues.Users_profile

    this.validate(this, InternalServerError)
  }
}


module.exports = {
  CommentResponseDTO
}
