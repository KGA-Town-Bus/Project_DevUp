const JWT = require("./jwt");
const jwt = new JWT();
const db = require("./db")

require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const {authorization} = req.headers;
      const token = authorization.split("Bearer ")[1]
      const payload = jwt.verify(token, process.env["JWT_SECRET_KEY"]);

      const {dataValues: user} = await db.Users.findOne(
          {where: {Users_uid: payload.Users_uid}}
      );
      delete user.Users_password

      req.user = user;
      return next();
    }
    return next()
  } catch (e) {
    next();
  }


}
