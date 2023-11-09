const axios = require("axios");

const SocialLogin = require("./socialLogin")


const CLIENT_ID = process.env.GI_CLIENT_ID
const CLIENT_SECRET = process.env.GI_CLIENT_SECRET

class Github extends SocialLogin{
  constructor(code) {
    super()
    this.code = code
  }

  async getSocialUserInfo() {
    const host = "https://github.com/login/oauth/access_token";
    const body = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code:this.code
    };

    const response = await axios.post(host, body)
    const access_token = response.data.split("&")[0].split("access_token=")[1]

    const {data: userInfo} = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });

    return userInfo
  }

  buildUser(userInfo) {
    return {
      Users_suid: userInfo.id,
      Users_id: userInfo.login,
      Users_password: "github",
      Users_name: "github",
      Users_nickname: "github",
      Users_provider: "github",
      Users_email: userInfo.email,
      Users_profile: userInfo.avatar_url,
      Role_authority: "user"
    }
  }

}


module.exports = Github