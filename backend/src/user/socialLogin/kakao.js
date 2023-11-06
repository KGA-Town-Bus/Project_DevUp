const axios = require("axios");
const REST_API_KEY = process.env.REST_API_KEY;
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
module.exports.kakao = async (code) => {

  const host = "https://kauth.kakao.com/oauth/token";
  const body = `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}`;

  const response = await axios.post(host, body, {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  })

  const {data: {access_token}} = response;

  const {data: userInfo} = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return userInfo
}