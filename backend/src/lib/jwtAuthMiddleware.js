const JWT = require('./jwt');
const jwt = new JWT();
const db = require('./db');

require('dotenv').config();

exports.auth = async (req, res, next) => {
  try {
    if (req.headers.authorization) await headerLogic(req, res, next);
    if (req.headers.cookie) await cookieLogic(req, res, next);

    return next();
  } catch (e) {
    next();
  }
};

const headerLogic = async (req, res, next) => {
  // 헤더로 JWT 토큰을 보낼 경우
  const {authorization} = req.headers;
  const token = authorization.split('Bearer ')[1];

  const user = await parsing(token);
  req.user = user;
  return;
};
const cookieLogic = async (req, res, next) => {
  // 쿠키로 보내는 경우
  const token = req.headers.cookie.split('authorization=')[1];
  const user = await parsing(token);

  req.user = user;
  return;
};

const parsing = async token => {
  const payload = jwt.verify(token, process.env['JWT_SECRET_KEY']);

  const {dataValues: user} = await db.Users.findOne({
    where: {Users_uid: payload.Users_uid},
  });
  delete user.Users_password;
  return user;
};

module.exports.parsing = parsing