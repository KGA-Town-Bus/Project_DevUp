const UserService = require("./user.service")
const EmailService = require("../email/email.service")
const UserController = require("./user.controller")

const db = require("../lib/db")

const {Users, Mail} = db

const userService = new UserService(Users)
const emailService = new EmailService(Mail)

const userController = new UserController(userService, emailService)

module.exports = {
  userController
}
