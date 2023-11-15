const express = require("express")
const userRouter = express.Router()
const {userController} = require("./user.module")
const getSignup = userController.getSignup.bind(userController)
const getLogin = userController.getLogin.bind(userController)
const postSignup = userController.postSignup.bind(userController)
const getProfile = userController.getProfile.bind(userController)
const postProfile = userController.postProfile.bind(userController)
const getLogout = userController.getLogout.bind(userController)


userRouter.get("/", getSignup)
userRouter.post("/", postSignup)

userRouter.get("/logout", getLogout)

userRouter.get("/profile", getProfile)
userRouter.post("/profile", postProfile)
userRouter.get("/:provider", getLogin)

module.exports = userRouter
