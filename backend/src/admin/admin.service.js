const db = require("../lib/db");
const {Op} = require("sequelize");

require("dotenv").config()
const {UserListResponseDTO} = require("./dto/user.list.response.dto")

class AdminService {
  constructor(User) {
    this.userRepository = User
  }

  async allUsersInfo(page) {
    try {
      const pageSize = 10;
      const offset = (page - 1) * pageSize

      const userList = await this.userRepository.findAll({
        // offset: offset,
        // limit: pageSize,
        order: [["Users_created_at", "DESC"]],
        where: {
          Role_authority: "user"
        }
      })

      const result = userList.map((user) => {
        return new UserListResponseDTO(user)
      })

      return result;
    } catch (e) {
      throw e
    }
  }

  async updateUser(userUid) {
    try {

      const {dataValues: user} = await this.userRepository.findOne({where: {Users_uid: userUid}})

      return await this.userRepository.update(
          {
            Users_account_locked: !user.Users_account_locked
          },
          {
            where: {Users_uid: userUid},
          }
      );

    } catch (e) {
      throw e
    }
  }

}


module.exports = AdminService
