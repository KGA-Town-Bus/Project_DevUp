const baseDTO = require("../../lib/base.dto")
const {BadRequest} = require("../../lib/customException");


class CommentCreateRequestDTO extends baseDTO {
  commentContent
  commentType
  postUid
  userUid


  constructor(req) {
    super()
    this.commentContent = req.body.comment
    this.commentType = req.body.type
    this.postUid = req.body.postUid
    this.userUid = req.user.Users_uid
    req.body.targetUid ? this.targetUid = req.body.targetUid : null

    this.validate(this, BadRequest)
  }
}


module.exports = {
  CommentCreateRequestDTO
}
