exports.auth = async (req, res, next) => {
  try {
    if(req.originalUrl === "/favicon.ico") return next()
    if (req.cookies) {
      const {authorization} = req.cookies;
      if (!authorization) return next();

      const payload = authorization.split(".")[1]
      const data = JSON.parse(Buffer.from(payload, "base64").toString("utf-8"))

      req.user = data
      return next()
    }

    return next()
  } catch (e) {
    res.clearCookie("authorization")
    next()
  }
}
