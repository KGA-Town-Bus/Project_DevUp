const baseDTO = require("../../lib/base.dto")
const {BadRequest} = require("../../lib/customException");


class CommentCreateRequestDTO extends baseDTO {
  commentContent
  postUid
  userUid

  constructor(req) {
    super()
    this.commentContent = req.body.comment
    this.postUid = req.body.postUid
    this.userUid = req.user.Users_uid

    this.validate(this, BadRequest)
  }
}


module.exports = {
  CommentCreateRequestDTO
}
