const axios = require("axios")
require("dotenv").config()
const BACKEND_SERVER_IP = process.env.BACKEND_SERVER_IP
const BACKEND_SERVER_PORT = process.env.BACKEND_SERVER_PORT

class UserService {

  async signup (body)  {
    try{
      const {data} = await axios.post(`https://${BACKEND_SERVER_IP}/users`,body)

      return data

    }catch(e){
      console.log(e)
      throw new Error(e.message)
    }
  }
}


module.exports = UserService