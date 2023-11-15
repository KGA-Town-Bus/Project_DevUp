const AdminService = require("./admin.service")
const AdminController = require("./admin.controller")

const adminService = new AdminService()
const adminController = new AdminController(adminService)

module.exports = {
  adminController
}
