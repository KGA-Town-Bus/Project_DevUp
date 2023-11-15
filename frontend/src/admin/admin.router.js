const express = require("express")
const adminRouter = express.Router()
const {adminController} = require("./admin.module")
const getAdmin = adminController.getAdmin.bind(adminController)


adminRouter.get("/", getAdmin)

module.exports = adminRouter
