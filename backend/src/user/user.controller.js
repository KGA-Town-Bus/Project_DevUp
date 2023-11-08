const {UserSignupRequestDTO} = require("./dto/user.signup.request.dto");
const {UserLoginRequestDTO} = require("./dto/user.login.request.dto");
const {BadRequest} = require("../lib/customException");
const {Created} = require("../lib/customMessage");
const axios = require("axios");
const {UserProfileRequestDTO} = require("./dto/user.profile.request.dto");
const JWT = require("../lib/jwt")
const jwt = new JWT()


require("dotenv").config()
const ENV = process.env.ENV


let domain
if (ENV === "develop") domain = `localhost`
if (ENV === "production") domain = `.hyunjun.kr`


class UserController {
  constructor(service) {
    this.service = service
  }

  async postSignup(req, res, next) {
    try {
      if (req.body.userPassword[0] !== req.body.userPassword[1]) throw new BadRequest("비밀번호가 일치하지 않습니다.")

      const userSignupRequestDTO = new UserSignupRequestDTO(req.body)
      const userSignupResponseDTO = await this.service.signup(userSignupRequestDTO)

      res.status(201).json(new Created(userSignupResponseDTO))
    } catch (e) {
      next(e)
    }
  }


  async login(req, res, next) {
    try {
      let code;
      let state
      let userLoginRequestDTO
      const provider = req.params.provider

      if (provider === "kakao") code = req.query.code
      if (provider === "google") code = req.query.code
      if (provider === "github") code = req.query.code
      if (provider === "naver") {
        code = req.query.code
        state = req.query.state
      }

      if (provider === "login") {
        userLoginRequestDTO = new UserLoginRequestDTO(req.body)
      }

      const token = await this.service.login(provider, code, state, userLoginRequestDTO);



      res.cookie("authorization", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        domain: domain,
        path: "/",
        sameSite: "none",
        secure: true
      });

      if (ENV === "develop") return res.redirect(`http://${process.env.FRONTEND_SERVER_IP}:${process.env.FRONTEND_SERVER_PORT}`)
      if (ENV === "production") return res.redirect(`https://${process.env.FRONTEND_SERVER_IP}`)


    } catch (e) {
      next(e)
    }
  }

  async postProfile(req, res, next) {
    try{
      const userProfileRequestDTO = new UserProfileRequestDTO(req)

      const result = await this.service.profileUpload(userProfileRequestDTO)
      req.user.Users_profile = result
      const token = setJWTToken(req.user)

      res.cookie("authorization", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        domain: domain,
        path: "/",
        sameSite: "none",
        secure: true
      });c

      res.status(201).json(new Created(result))


    }catch(e){
      next(e)
    }

  }


}

const setJWTToken = (data) => {
  const jwtPayload = data;
  const token = jwt.sign(jwtPayload)
  return token
}


module.exports = UserController