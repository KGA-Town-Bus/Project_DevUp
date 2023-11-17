const axios = require("axios");
const Kakao = require("./socialLogin/kakao")
const Google = require("./socialLogin/google")
const Github = require("./socialLogin/github")
const Naver = require("./socialLogin/naver")
const JWT = require("../lib/jwt")
const jwt = new JWT()
const {Op, where} = require('sequelize');
const {UserSignupResponseDTO} = require("./dto/user.signup.response.dto");
const mailer = require("../lib/mail")
const {BadRequest} = require("../lib/customException");
const bcrypt = require("bcryptjs")
const db = require("../lib/db");

require("dotenv").config()

const ENV = process.env.ENV
const BACKEND_SERVER_IP = process.env.BACKEND_SERVER_IP
const BACKEND_SERVER_PORT = process.env.BACKEND_SERVER_PORT
const PROTOCOL = process.env.PROTOCOL


class UserService {
  constructor(User) {
    this.userRepository = User
  }

  async signup(requestDTO) {
    try {
      const [user, isNewRecord] = await this.userRepository.findOrBuild({
        where: {Users_id: requestDTO.userId},
      })

      if (!isNewRecord) throw new BadRequest("이미 존재하는 아이디 입니다.")

      user.Users_id = requestDTO.userId;

      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(requestDTO.userPassword, salt)
      user.Users_password = hash
      user.Users_name = "name"
      user.Users_nickname = "nickname"
      user.Users_provider = "local"
      user.Users_created_at = Date.now()
      user.Users_account_locked = true
      user.Users_email = requestDTO.userEmail
      user.Users_profile = "/images/github%20logo.png"
      user.Role_authority = "user"


      const response = await user.save()
      const responseDTO = new UserSignupResponseDTO(response.dataValues)

      return responseDTO
    } catch (e) {
      throw e
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

      if (provider === "naver") {
        const naver = new Naver(code, state)
        userInfo = await naver.getSocialUserInfo()
        user = this.userRepository.build(naver.buildUser(userInfo))
      }

      if (provider === "login") {
        const result = await this.userRepository.findOne({
          include: {
            model: db.Mail,
            attributes: ["Mail_check"]
          },
          where: {
            [Op.and]: [
              {Users_id: userLoginRequestDTO.userId},
              {Users_provider: "local"}
            ]
          }
        })
        if (result === null) throw new BadRequest("아이디 혹은 비밀번호를 확인해 주세요.")


        const isPasswordCorrect = await bcrypt.compare(
            userLoginRequestDTO.userPassword,
            result.dataValues.Users_password
        )
        if (isPasswordCorrect === false) throw new BadRequest("아이디 혹은 비밀번호를 확인해 주세요.")


        const {dataValues: user} = result

        if (user.Mail.dataValues.Mail_check === false) throw new BadRequest("이메일 인증을 진행해 주세요.")
        if (user.Users_account_locked === true) throw new BadRequest("잠긴 계정입니다.")

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
      domain = `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/`

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
      throw e;
    }
  }

  async userInfoUpdate(requestDTO) {
    try {
      const salt = bcrypt.genSaltSync(10)
      const result = await this.userRepository.update(
          {
            Users_nickname: requestDTO.userNickname,
            Users_name: requestDTO.userName,
            Users_email: requestDTO.userEmail,
            Users_password: requestDTO.userPassword ? bcrypt.hashSync(requestDTO.userPassword, salt) : "password"
          },
          {
            where: {
              Users_uid: requestDTO.userUid
            }
          },
      )
      return result
    } catch (e) {
      throw e
    }
  }

  async userLockedCheck(user) {
    try{
      const findUser = await this.userRepository.findOne({
        where: {
          Users_uid: user.Users_uid
        }
      })
      return findUser.dataValues.Users_account_locked;
    }catch(e){
      throw e
    }
  }



}

const setJWTToken = (data) => {
  const jwtPayload = data;
  const token = jwt.sign(jwtPayload)
  return token
}


module.exports = UserService