const axios = require("axios");
const Kakao = require("./socialLogin/kakao")
const Google = require("./socialLogin/google")
const Github = require("./socialLogin/github")
const JWT = require("../lib/jwt")
const jwt = new JWT()

class UserService {
  constructor(User) {
    this.userRepository = User
  }

  async signup(dto) {
    try {

      const userEntity = this.userRepository.build({
        Users_id: dto.userId,
        Users_password: dto.userPassword,
        Users_name: dto.userName,
        Users_nickname: dto.userNickname,
        Users_provider: "service",
        Users_created_at: Date.now(),
        Users_account_locked: false,
        Users_email: dto.userEmail,
        //todo
        Users_profile: "https://test.com/image01.png",
        Role_authority: "user",
      });


      const response = await userEntity.save()

      return response
    } catch (e) {
      console.log(e.message)
      throw new Error(e.message)
    }
  }

  async login(provider, code) {

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
}

const setJWTToken = (data) => {
  const jwtPayload = data;
  const token = jwt.sign(jwtPayload)
  return token
}


module.exports = UserService