const express = require("express")
const userRouter = express.Router()

const userController = require("./user.controller")


userRouter.post("/", userController.postSignup)

module.exports = userRouter