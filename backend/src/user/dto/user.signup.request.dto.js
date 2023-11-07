const baseDTO = require("../../lib/base.dto")
const {BadRequest} = require("../../lib/customException");


class UserSignupRequestDTO extends baseDTO {
  userId
  userPassword
  userEmail

  constructor(body) {
    super()
    this.userId = body.userId
    this.userPassword = body.userPassword[0]
    this.userEmail = body.userEmail

    this.validate(this, BadRequest)
  }
}


module.exports = {
  UserSignupRequestDTO
}
