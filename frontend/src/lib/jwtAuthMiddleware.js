const {BadRequest} = require("./customException");

require("dotenv").config()
const DOMAIN = process.env.DOMAIN

const axios = require("axios")

exports.auth = async (req, res, next) => {
  try {

    if (req.originalUrl === "/favicon.ico") return next()
    if (req.cookies) {
      const {authorization} = req.cookies;
      if (!authorization) return next();

      const payload = authorization.split(".")[1]
      const data = JSON.parse(Buffer.from(payload, "base64").toString("utf-8"))

      const {data: message} = await axios.post("http://localhost:4000/users/check", {}, {
        headers: {
          Authorization: `Bearer ${authorization}`
        }, withCredentials: true
      })
      if (message.errorMessage ==="잠긴 계정입니다.") throw new BadRequest("잠긴 계정입니다.")

      req.user = data
      return next()
    }

    return next()
  } catch (e) {
    res.clearCookie("authorization", {domain: DOMAIN})
    next(e)
  }
}
