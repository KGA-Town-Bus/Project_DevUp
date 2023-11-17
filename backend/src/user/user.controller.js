const {UserSignupRequestDTO} = require("./dto/user.signup.request.dto");
const {UserLoginRequestDTO} = require("./dto/user.login.request.dto");
const {BadRequest} = require("../lib/customException");
const {Created, OK} = require("../lib/customMessage");
const axios = require("axios");
const {UserProfileImageRequestDTO} = require("./dto/userProfileImageRequestDTO");
const JWT = require("../lib/jwt")
const {UserProfileFormRequestDTO} = require("./dto/userProfileFormRequestDTO");
const jwt = new JWT()


require("dotenv").config()
const PROTOCOL = process.env.PROTOCOL
const ENV = process.env.ENV
const DOMAIN = process.env.DOMAIN


class UserController {
  constructor(service, emailService) {
    this.service = service
    this.emailService = emailService
  }

  async postSignup(req, res, next) {
    try {
      if (req.body.userPassword[0] !== req.body.userPassword[1]) throw new BadRequest("비밀번호가 일치하지 않습니다.")

      const userSignupRequestDTO = new UserSignupRequestDTO(req.body)
      const userSignupResponseDTO = await this.service.signup(userSignupRequestDTO)

      await this.emailService.mailSend(userSignupResponseDTO)

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
        domain: DOMAIN,
        path: "/",
        sameSite: "none",
        secure: true
      });
      return res.redirect(`${PROTOCOL}://${process.env.FRONTEND_SERVER_IP}:${process.env.FRONTEND_SERVER_PORT}?token=${token}`)

    } catch (e) {
      next(e)
    }
  }

  async postProfile(req, res, next) {
    try {
      const userProfileImageRequestDTO = new UserProfileImageRequestDTO(req)

      const result = await this.service.profileUpload(userProfileImageRequestDTO)
      req.user.Users_profile = result
      const token = setJWTToken(req.user)

      res.cookie("authorization", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        domain: DOMAIN,
        path: "/",
        sameSite: "none",
        secure: true
      });

      res.status(201).json(new Created(result))


    } catch (e) {
      next(e)
    }

  }

  async putProfile(req, res, next) {
    try {
      const userProfileFormRequestDTO = new UserProfileFormRequestDTO(req)
      const result = await this.service.userInfoUpdate(userProfileFormRequestDTO)
      req.user.Users_nickname = userProfileFormRequestDTO.userNickname
      req.user.Users_name = userProfileFormRequestDTO.userName
      req.user.Users_email = userProfileFormRequestDTO.userEmail


      const token = setJWTToken(req.user)
      res.status(201).json(new Created(token))

    } catch (e) {
      next(e)
    }
  }

  async postUserLockedCheck(req, res, next) {
    try {
      const isUserAccountLocked = await this.service.userLockedCheck(req.user)
      return res.status(200).json(new OK(isUserAccountLocked))
    } catch (e) {
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