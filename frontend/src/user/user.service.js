
const axios = require("axios")
require("dotenv").config()
const BACKEND_SERVER_IP = process.env.BACKEND_SERVER_IP
const BACKEND_SERVER_PORT = process.env.BACKEND_SERVER_PORT
const PROTOCOL = process.env.PROTOCOL

class UserService {

  async signup(body) {
    try {
      // const {data} = await axios.post(`${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/users`, body)
      const {data} = await axios.post(`http://localhost:4000/users`, body)
      return data


    } catch (e) {
      throw new Error(e.message)
    }
  }

  async profileUpdate(req) {
    try {

      const {authorization} = req.cookies;
      // const {data} = await axios.put(`${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/users/profile`, req.body,
      const {data} = await axios.put(`http://localhost:4000/users/profile`, req.body,
          {headers:{
            Authorization: `Bearer ${authorization}`
            },withCredentials:true
          })



      return data


    } catch (e) {
      throw new Error(e.message)

    }
  }
}

module.exports = UserService;
