const UserBaseDTO = require("./user.base.dto")
const {BadRequest} = require("../exception/customException");


class UserSignupRequestDTO extends UserBaseDTO {
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
