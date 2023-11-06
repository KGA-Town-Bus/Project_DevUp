require("dotenv").config()
const REST_API_KEY = process.env.REST_API_KEY;
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

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
      console.log(provider)

      let redirectURI;

      if (provider === "kakao") redirectURI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

      if (provider === "naver") {
      }

      if (provider === "github") {
      }

      if (provider === "google") {
      }


      res.redirect(redirectURI)
    } catch (e) {
      console.log(e)
      next(e)
    }
  }
}


module.exports = UserController