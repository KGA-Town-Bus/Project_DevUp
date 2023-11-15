const baseDTO = require("../../lib/base.dto")
const {BadRequest} = require("../../lib/customException");


class UserProfileFormRequestDTO extends baseDTO {
  userUid
  userNickname
  userName
  userEmail
  // userPassword

  constructor(req) {
    super()
    this.userUid = req.user.Users_uid
    this.userNickname = req.body.userNickname
    this.userName = req.body.userName
    this.userEmail = req.body.userEmail
    if(req.user.Users_provider === "local") {
      if (req.body.userPassword[0] !== req.body.userPassword[1]) throw new BadRequest("비밀번호가 일치하지 않습니다.")
      this.userPassword = req.body.userPassword[0]
    }
    this.validate(this, BadRequest)
  }
}


module.exports = {
  UserProfileFormRequestDTO
}
