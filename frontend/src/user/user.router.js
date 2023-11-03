const express = require("express")
const userRouter = express.Router()
const {userController} = require("./user.module")
const getSignup = userController.getSignup.bind(userController)


userRouter.get("/", getSignup)

module.exports = userRouter
