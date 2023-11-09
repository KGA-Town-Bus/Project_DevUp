require("dotenv").config()
// kakao
const REST_API_KEY = process.env.REST_API_KEY;
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

// google
const GOOGLE_AUTHORIZE_URI = process.env.GOOGLE_AUTHORIZE_URI
const CLIENT_ID = process.env.CLIENT_ID
const RESPONSE_TYPE = process.env.RESPONSE_TYPE
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI
const SCOPE = process.env.SCOPE
const ACCESS_TYPE = process.env.ACCESS_TYPE

// github
const GITHUB_AUTHORIZE_URI = process.env.GI_AUTHORIZE_URI
const GITHUB_CLIENT_ID = process.env.GI_CLIENT_ID
const GITHUB_REDIRECT_URI = process.env.GI_REDIRECT_URI

// naver
const NAVER_AUTHORIZE_URI = process.env.NAVER_AUTHORIZE_URI
const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID
const NAVER_REDIRECT_URI = process.env.NAVER_REDIRECT_URI

const DOMAIN = process.env.DOMAIN

class UserController {
  constructor(service) {
    this.service = service
  }

  getSignup(req, res, next) {
    try {
      res.render("user/signup.html")
    } catch (e) {
      next(e)
    }
  }

  getLogout(req, res, next) {
    try{
      res.clearCookie("authorization",{path: "/", domain: DOMAIN})
      res.redirect("/")
    }catch(e){
      next(e)
    }
  }


  getProfile(req, res, next) {
    try {
      const user = req.user ? req.user : undefined
      if (!user) return res.redirect("/")

      res.render("user/profile.html", {user})
    } catch (e) {
      next(e)
    }
  }

  async postProfile(req, res, next) {
    try {
      const result = await this.service.profileUpdate(req)


      res.cookie("authorization", result.data, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        domain: DOMAIN,
        path: "/",
        sameSite: "none",
        secure: true
      });

      res.redirect("/")

    } catch (e) {
      next(e)
    }
  }

  async getLogin(req, res, next) {
    try {
      const provider = req.params.provider
      let redirectURI;

      if (provider === "kakao") redirectURI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
      if (provider === "google") redirectURI = `${GOOGLE_AUTHORIZE_URI}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=${SCOPE}&access_type=${ACCESS_TYPE}`
      if (provider === "github") redirectURI = `${GITHUB_AUTHORIZE_URI}?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}`
      if (provider === "naver") redirectURI = `${NAVER_AUTHORIZE_URI}?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=RAMDOM_STATE`
      if (provider === "login") return res.render("user/login.html")
      res.redirect(redirectURI)
    } catch (e) {
      next(e)
    }
  }

  async postSignup(req, res, next) {
    try {
      const result = await this.service.signup(req.body)

      res.redirect("/")
    } catch (e) {
      next(e)
    }
  }
}


module.exports = UserController