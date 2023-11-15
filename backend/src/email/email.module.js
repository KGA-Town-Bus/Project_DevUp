const EmailService = require("./email.service")
const EmailController = require("./email.controller")
const db = require("../lib/db")

const { Mail, Users} = db
const emailService = new EmailService(Mail, Users)
const emailController = new EmailController(emailService)

module.exports = {
  emailController
}
