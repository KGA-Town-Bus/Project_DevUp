const AdminService = require("./admin.service")
const AdminController = require("./admin.controller")
const db = require("../lib/db")

const {Users} = db

const adminService = new AdminService(Users)
const adminController = new AdminController(adminService)

module.exports = {
  adminController
}
