const axios = require("axios")
require("dotenv").config()


class AdminService {
  async getAdmin(authorization) {
    try {
      const {data : {data}} = await axios.get("http://localhost:4000/admin/users", {},{
        headers: {
          Authorization: `Bearer ${authorization}`
        }, withCredentials: true
      })

      return data;
    } catch (e) {
      throw e
    }
  }
}

module.exports = AdminService;
