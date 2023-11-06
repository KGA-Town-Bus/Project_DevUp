const {UserSignupRequestDTO} = require("./dto/user.signup.request.dto");


require("dotenv").config()



class UserController {
  constructor(service) {
    this.service = service
  }
  async postSignup(req, res, next)  {
    try{
      const userSignupRequestDTO = new UserSignupRequestDTO(req.body)
      const data = await this.service.signup(userSignupRequestDTO)
      res.status(201).json(data)
    }catch(e){
      next(e)
    }
  }


  async login(req, res, next) {
    try{
      let code;
      const provider = req.params.provider

      if(provider === "kakao") code = req.query.code
      if(provider === "google") code = req.query.code
      if(provider === "github") code = req.query.code

      const token = await this.service.login(provider, code);

      res.cookie("authorization", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        domain: `${process.env.FRONTEND_SERVER_IP}`,
        path: "/",
      });


      res.redirect(`http://${process.env.FRONTEND_SERVER_IP}:${process.env.FRONTEND_SERVER_PORT}/`)

    }catch(e){
      console.log(e)
      next(e)
    }
  }


}


module.exports = UserController