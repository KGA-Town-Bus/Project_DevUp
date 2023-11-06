const express = require("express")
const userRouter = express.Router()
const {userController} = require("./user.module")
const getSignup = userController.getSignup.bind(userController)
const getLogin = userController.getLogin.bind(userController)


userRouter.get("/", getSignup)
userRouter.get("/:provider", getLogin)

module.exports = userRouter
