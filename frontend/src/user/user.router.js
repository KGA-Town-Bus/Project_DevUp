const express = require("express")
const userRouter = express.Router()
const {userController} = require("./user.module")
const getSignup = userController.getSignup.bind(userController)
const getLogin = userController.getLogin.bind(userController)
const postSignup = userController.postSignup.bind(userController)



userRouter.get("/", getSignup)
userRouter.post("/", postSignup)

userRouter.get("/:provider", getLogin)

module.exports = userRouter
