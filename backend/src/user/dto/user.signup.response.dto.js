const baseDTO = require("../../lib/base.dto")
const {BadRequest} = require("../../lib/customException");


class UserSignupResponseDTO extends baseDTO {
  userUid
  userId
  userEmail
  userProvider
  userCreatedAt
  userAccountLocked
  roleAuthority

  constructor(response) {
    super()
    this.userUid = response.Users_uid
    this.userId = response.Users_id
    this.userEmail = response.Users_email
    this.userProvider = response.Users_provider
    this.userCreatedAt= response.Users_created_at
    this.userAccountLocked = response.Users_account_locked
    this.roleAuthority = response.Role_authority

    this.validate(this, BadRequest)
  }
}


module.exports = {
  UserSignupResponseDTO
}
