const axios = require("axios");
const Kakao = require("./socialLogin/kakao")
const Google = require("./socialLogin/google")
const Github = require("./socialLogin/github")
const Naver = require("./socialLogin/naver")
const JWT = require("../lib/jwt")
const jwt = new JWT()
const {Op} = require('sequelize');
const {UserSignupResponseDTO} = require("./dto/user.signup.response.dto");

require("dotenv").config()

const ENV = process.env.ENV
const BACKEND_SERVER_IP = process.env.BACKEND_SERVER_IP
const BACKEND_SERVER_PORT = process.env.BACKEND_SERVER_PORT



class UserService {
  constructor(User) {
    this.userRepository = User
  }

  async signup(requestDTO) {
    try {

      const userEntity = this.userRepository.build({
        Users_id: requestDTO.userId,
        Users_password: requestDTO.userPassword,
        Users_name: "__default__",
        Users_nickname: "__default__",
        Users_provider: "service",
        Users_created_at: Date.now(),
        Users_account_locked: false,
        Users_email: requestDTO.userEmail,
        // todo: 기본 이미지 설정
        Users_profile: "__default__",
        Role_authority: "user",
      });


      const response = await userEntity.save()
      const responseDTO = new UserSignupResponseDTO(response.dataValues)

      return responseDTO
    } catch (e) {
      console.log(e.message)
      throw new Error(e.message)
    }
  }

  async login(provider, code, state, userLoginRequestDTO) {

    try {
      let userInfo;
      let user;

      if (provider === "kakao") {
        const kakao = new Kakao(code)
        userInfo = await kakao.getSocialUserInfo()
        user = this.userRepository.build(kakao.buildUser(userInfo))
      }

      if (provider === "google") {
        const google = new Google(code)
        userInfo = await google.getSocialUserInfo()
        user = this.userRepository.build(google.buildUser(userInfo))
      }

      if (provider === "github") {
        const github = new Github(code)
        userInfo = await github.getSocialUserInfo()
        user = this.userRepository.build(github.buildUser(userInfo))
      }

      if (provider == "naver") {
        const naver = new Naver(code, state)
        userInfo = await naver.getSocialUserInfo()
        user = this.userRepository.build(naver.buildUser(userInfo))
      }

      if (provider == "login") {
        const {dataValues: user} = await this.userRepository.findOne({
          where: {
            [Op.and]: [
              {Users_id: userLoginRequestDTO.userId},
              {Users_password: userLoginRequestDTO.userPassword},
              {Users_provider: "service"}
            ]
          }
        })
        delete user.Users_password

        return setJWTToken(user)
      }


      const isUser = await this.userRepository.findOne({
        where: {
          Users_suid: user.dataValues.Users_suid
        },
        attributes: {
          exclude: ['Users_password']
        }
      })


      if (isUser !== null) return setJWTToken(isUser.dataValues)

      // const response = await user.save()
      const response = await user.save().then(() => {
        return user.reload()
      })
      delete response.dataValues.Users_password

      return setJWTToken(response.dataValues)
    } catch (e) {
      throw e
    }

  }


  async profileUpload(requestDTO) {
    try {
      let domain;
      if(ENV === "develop"){
        domain = `http://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/`
      }
      if(ENV === "production") {
        domain = `https://${BACKEND_SERVER_IP}/`
      }

      const filePath = domain + requestDTO.profile.filename

      const [result] = await this.userRepository.update(
          {Users_profile: filePath},
          {
            where: {
              Users_uid: requestDTO.userUid
            }
          }
      )


      return filePath
    } catch (e) {
      throw new Error(e.message);
    }


  }
}

const setJWTToken = (data) => {
  const jwtPayload = data;
  const token = jwt.sign(jwtPayload)
  return token
}


module.exports = UserService