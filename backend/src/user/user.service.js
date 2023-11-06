const axios = require("axios");
const {kakao} = require("./socialLogin/kakao")
const JWT  = require("../lib/jwt")
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

    try{
      let userInfo;
      let uid;
      if (provider === "kakao") {
        userInfo = await kakao(code)
        uid = userInfo.id
      }

      const isUser = await this.userRepository.findOne({
        where:{
          Users_uid: uid
        },
        attributes: {
          exclude: ['Users_password']
        }
      })

      if (isUser !== null) return setJWTToken(isUser.dataValues)

      const user = this.userRepository.build({
        Users_uid: uid,
        Users_id: "kakao",
        Users_password: "kakao",
        Users_name: "kakao",
        Users_nickname: userInfo.properties.nickname,
        Users_provider: "kakao",
        Users_email: "kakao",
        Users_profile: userInfo.properties.profile_image,
        Role_authority: "user"
      })

      const response = await user.save()
      delete response.dataValues.Users_password

      return setJWTToken(response.dataValues)
    }catch(e){
      throw e
    }

  }
}

const setJWTToken =(data) => {
  const jwtPayload = data;
  const token = jwt.sign(jwtPayload)
  return token
}


module.exports = UserService