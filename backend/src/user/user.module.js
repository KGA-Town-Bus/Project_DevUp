const UserService = require("./user.service")
const UserController = require("./user.controller")

const db = require("../lib/db")
const {Users} = db
const userService = new UserService(Users)
const userController = new UserController(userService)

module.exports = {
  userController
}
