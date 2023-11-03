const baseDTO = require("../../lib/base.dto")
const {BadRequest} = require("../../lib/customException");


class UserSignupRequestDTO extends baseDTO {
  userId
  userPassword
  userName
  userNickname
  userProfile
  userEmail

  constructor(body) {
    super()
    this.userId = body.userId
    this.userPassword = body.userPassword
    this.userName = body.userName
    this.userNickname = body.userNickname
    this.userProfile = body.userProfile
    this.userEmail = body.userEmail

    this.validate(this, BadRequest)
  }
}


module.exports = {
  UserSignupRequestDTO
}
