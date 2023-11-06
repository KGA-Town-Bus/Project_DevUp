require("dotenv").config()
// kakao
const REST_API_KEY = process.env.REST_API_KEY;
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
// ==

// google
const AUTHORIZE_URI = process.env.AUTHORIZE_URI
const CLIENT_ID = process.env.CLIENT_ID
const RESPONSE_TYPE = process.env.RESPONSE_TYPE
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI
const SCOPE = process.env.SCOPE
const ACCESS_TYPE = process.env.ACCESS_TYPE
// ==

class UserController {
  constructor(service) {
    this.service = service
  }

  async getSignup(req, res, next) {
    try {
      res.render("signup/signup.html")
    } catch (e) {
      next(e)
    }
  }

  async getLogin(req, res, next) {
    try {
      const provider = req.params.provider
      let redirectURI;

      if (provider === "kakao") redirectURI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

      if (provider === "google") redirectURI = `${AUTHORIZE_URI}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=${SCOPE}&access_type=${ACCESS_TYPE}`

      if (provider === "naver") {
      }

      if (provider === "github") {
      }




      res.redirect(redirectURI)
    } catch (e) {
      console.log(e)
      next(e)
    }
  }
}


module.exports = UserController