const axios = require("axios");
const REST_API_KEY = process.env.REST_API_KEY;
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
const SocialLogin = require("./socialLogin")

class Kakao extends SocialLogin{
  constructor(code) {
    super()
    this.code = code
  }

  async getSocialUserInfo() {
    const host = "https://kauth.kakao.com/oauth/token";
    const body = `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${this.code}`;

    const response = await axios.post(host, body, {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    })

    const {data: {access_token}} = response;

    const {data: userInfo} = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return userInfo
  }

  buildUser(userInfo) {
    return {
      Users_suid: userInfo.id,
      Users_id: "kakao",
      Users_password: "kakao",
      Users_name: "kakao",
      Users_nickname: userInfo.properties.nickname,
      Users_provider: "kakao",
      Users_email: "kakao",
      Users_profile: userInfo.properties.profile_image,
      Role_authority: "user"
    }
  }
}

module.exports = Kakao