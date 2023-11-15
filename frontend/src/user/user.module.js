const UserService = require("./user.service")
const UserController = require("./user.controller")

const userService = new UserService()
const userController = new UserController(userService)

module.exports = {
  userController
}
