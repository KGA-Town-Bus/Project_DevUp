const baseDTO = require("../../lib/base.dto")
const {BadRequest} = require("../../lib/customException");


class UserProfileFormRequestDTO extends baseDTO {
  userUid
  userNickname
  userName
  userEmail
  userPassword

  constructor(req) {
    super()
    this.userUid = req.user.Users_uid
    this.userNickname = req.body.userNickname
    this.userName = req.body.userName
    this.userEmail = req.body.userEmail
    this.userPassword = req.body.userPassword[0]

    this.validate(this, BadRequest)
  }
}


module.exports = {
  UserProfileFormRequestDTO
}
