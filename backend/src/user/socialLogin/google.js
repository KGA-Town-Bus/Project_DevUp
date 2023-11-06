const axios = require("axios");

const SocialLogin = require("./socialLogin")


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI

class Google extends SocialLogin{
  constructor(code) {
    super()
    this.code = code
  }


  async getSocialUserInfo() {
    const host = `https://oauth2.googleapis.com/token?code=${this.code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${GOOGLE_REDIRECT_URI}&grant_type=authorization_code`;

    const response = await axios.post(host);

    const {data: {access_token}} = response;

    const {data:userInfo} = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo?alt=json", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return userInfo
  }

  buildUser(userInfo) {
    return {
      Users_suid: userInfo.id,
      Users_id: userInfo.email,
      Users_password: "google",
      Users_name: userInfo.name,
      Users_nickname: "google",
      Users_provider: "google",
      Users_email: userInfo.email,
      Users_profile: userInfo.picture,
      Role_authority: "user"
    }
  }

}


module.exports = Google