const baseDTO = require("../../lib/base.dto")
const {BadRequest} = require("../../lib/customException");


class UserLoginRequestDTO extends baseDTO {
  userId
  userPassword

  constructor(body) {
    super()
    this.userId = body.userId
    this.userPassword = body.userPassword

    this.validate(this, BadRequest)
  }
}


module.exports = {
  UserLoginRequestDTO
}
