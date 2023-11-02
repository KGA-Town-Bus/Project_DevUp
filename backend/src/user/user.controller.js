const {UserSignupRequestDTO} = require("./dto/user.signup.request.dto");

class UserController {
  constructor(service) {
    this.service = service
  }
  async postSignup(req, res, next)  {
    try{
      const userSignupRequestDTO = new UserSignupRequestDTO(req.body)
      const data = await this.service.signup(userSignupRequestDTO)

      res.status(201).json(data)

      return data;

    }catch(e){

      next(e)
    }
  }
}


module.exports = UserController