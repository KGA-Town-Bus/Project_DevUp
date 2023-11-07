const {UserSignupRequestDTO} = require("./dto/user.signup.request.dto");
const {UserLoginRequestDTO} = require("./dto/user.login.request.dto");
const {BadRequest} = require("../lib/customException");
const {Created} = require("../lib/customMessage");


require("dotenv").config()



class UserController {
  constructor(service) {
    this.service = service
  }
  async postSignup(req, res, next)  {
    try{
      if(req.body.userPassword[0] !== req.body.userPassword[1]) throw new BadRequest("비밀번호가 일치하지 않습니다.")

      const userSignupRequestDTO = new UserSignupRequestDTO(req.body)
      const userSignupResponseDTO = await this.service.signup(userSignupRequestDTO)

      res.status(201).json(new Created(userSignupResponseDTO))
    }catch(e){
      next(e)
    }
  }


  async login(req, res, next) {
    try{
      let code;
      let state
      let userLoginRequestDTO
      const provider = req.params.provider

      if(provider === "kakao") code = req.query.code
      if(provider === "google") code = req.query.code
      if(provider === "github") code = req.query.code
      if(provider === "naver") {
        code = req.query.code
        state = req.query.state
      }

      if(provider === "login"){
        userLoginRequestDTO = new UserLoginRequestDTO(req.body)
      }

      const token = await this.service.login(provider, code, state, userLoginRequestDTO);

      res.cookie("authorization", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        domain: `.${process.env.FRONTEND_SERVER_IP}`,
        path: "/",
        sameSite: "none",
        secure: true
      });


      res.redirect(`http://${process.env.FRONTEND_SERVER_IP}`)
    }catch(e){
      next(e)
    }
  }


}


module.exports = UserController