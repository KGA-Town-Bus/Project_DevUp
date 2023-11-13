const baseDTO = require("../../lib/base.dto")
const {InternalServerError} = require("../../lib/customException");


class UserListResponseDTO extends baseDTO {
  userUid
  userSuid
  userId
  userName
  userNickname
  userEmail
  userProfile
  userProvider
  userCreatedAt
  userAccountLocked
  roleAuthority

  constructor(response) {
    super()
    this.userUid = response.Users_uid
    this.userSuid = response.Users_suid
    this.userId = response.Users_id
    this.userName = response.Users_name
    this.userNickname = response.Users_nickname
    this.userEmail = response.Users_email
    this.userProfile = response.Users_profile
    this.userProvider = response.Users_provider
    this.userCreatedAt= response.Users_created_at
    this.userAccountLocked = response.Users_account_locked
    this.roleAuthority = response.Role_authority

    this.validate(this, InternalServerError)
  }
}


module.exports = {
  UserListResponseDTO
}
