const axios = require("axios")
require("dotenv").config()
const BACKEND_SERVER_IP = process.env.BACKEND_SERVER_IP
const BACKEND_SERVER_PORT = process.env.BACKEND_SERVER_PORT
const ENV = process.env.ENV

class UserService {

  async signup(body) {
    try {

      if (ENV === "develop") {
        const {data} = await axios.post(`http://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/users`, body)
        return data

      }
      if (ENV === "production") {
        const {data} = await axios.post(`https://${BACKEND_SERVER_IP}/users`, body)
        return data

      }

    } catch (e) {
      throw new Error(e.message)
    }
  }
}


module.exports = UserService