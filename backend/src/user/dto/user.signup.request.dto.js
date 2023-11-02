const UserBaseDTO = require("./user.base.dto")
const {BadRequest} = require("../exception/customException");


class UserSignupRequestDTO extends UserBaseDTO {
  userUid
  userId
  userPassword
  userName
  userNickname
  userProvider
  userAccountLocked
  userProfile
  roleAuthority

  constructor(body) {
    super()
    this.userUid = body.userUid
    this.userId = body.userId
    this.userPassword = body.userPassword
    this.userName = body.userName
    this.userNickname = body.userNickname
    this.userProvider = body.userProvider
    this.userAccountLocked = body.userAccountLocked
    this.userProfile = body.userProfile
    this.roleAuthority = body.roleAuthority

    this.validate(this, BadRequest)
  }
}


module.exports = {
  UserSignupRequestDTO
}
