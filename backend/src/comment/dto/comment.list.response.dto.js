const baseDTO = require("../../lib/base.dto")
const {InternalServerError} = require("../../lib/customException");


class CommentListResponseDTO extends baseDTO {
  commentUid
  commentContent
  commentCreatedAt
  commentPostUid
  commentUserUid
  commentUserNickname
  commentUserProfile
  replies = []

  constructor(comment) {
    super()
    this.commentUid = comment.Comments_uid
    this.commentContent = comment.Comments_content
    this.commentCreatedAt = comment.Comments_created_at
    this.commentPostUid = comment.Posts_uid
    this.commentUserUid = comment.Users_uid
    this.commentUserNickname = comment.User.dataValues.Users_nickname
    this.commentUserProfile = comment.User.dataValues.Users_profile
    comment.Replies.forEach((comment) => {
      if (comment) {

        const replies = {
          commentUid: comment.dataValues.Comments_uid,
          commentContent: comment.dataValues.Comments_content,
          commentCreatedAt: comment.dataValues.Comments_created_at,
          commentPostUid: comment.dataValues.Posts_uid,
          commentUserUid: comment.dataValues.Users_uid,
          commentUserNickname: comment.dataValues.User.Users_nickname,
          commentUserProfile: comment.dataValues.User.Users_profile,
        }

        this.replies.push(replies)
      }
    })
    this.validate(this, InternalServerError)
  }
}


module.exports = {
  CommentListResponseDTO
}
