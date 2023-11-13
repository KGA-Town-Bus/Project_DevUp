const {BadRequest} = require("../lib/customException");
require("dotenv").config()


class AdminController {
  constructor(service) {
    this.service = service
  }

  async getAdmin(req, res, next) {
    try {

      if (!req.user) throw new BadRequest("로그인을 해주세요.")
      if (req.user.Role_authority !== "admin") throw new BadRequest("관리자만 접근 가능합니다.")

      const {authorization} = req.cookies;

      const userList = await this.service.getAdmin(authorization)
      const user = req.user ? req.user : undefined


      res.render("admin/admin.html", {user, userList})
    } catch (e) {
      next(e)
    }

  }

}


module.exports = AdminController