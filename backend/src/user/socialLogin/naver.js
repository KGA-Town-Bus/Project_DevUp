const axios = require("axios");

const SocialLogin = require("./socialLogin")



const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID
const NAVER_CLINET_SECRET = process.env.NAVER_CLINET_SECRET
const NAVER_REDIRECT_URI = process.env.NAVER_REDIRECT_URI


class Naver extends SocialLogin{
  constructor(code, state) {
    super()
    this.code = code
    this.state = state
  }

  async getSocialUserInfo() {

    const host =
        `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLINET_SECRET}&redirect_uri=${NAVER_REDIRECT_URI}&code=${this.code}&state=${this.state}`;

    const {data: {access_token}} = await axios.get(host, {
      headers: {
        "X-Naver-Client-Id" : NAVER_CLIENT_ID,
        "X-Naver-Client-Secret" : NAVER_CLINET_SECRET,
      },
    });



    const {data: {response: userInfo}} = await axios.get("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });


    return userInfo
  }

  buildUser(userInfo) {
    return {
      Users_suid: userInfo.id,
      Users_id: "naver",
      Users_password: "naver",
      Users_name: userInfo.name,
      Users_nickname: userInfo.nickname,
      Users_provider: "naver",
      Users_email: userInfo.email,
      Users_profile: userInfo.profile_image,
      Role_authority: "user"
    }
  }

}


module.exports = Naver