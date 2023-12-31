const {OK} = require("../lib/customMessage");
const {UserListResponseDTO} = require("./dto/user.list.response.dto");

class AdminController {
  constructor(service) {
    this.service = service
  }

  async getAdmin (req, res, next) {
    try{
      const UserListResponseDTOList = await this.service.allUsersInfo(1)

      res.status(200).json(new OK(UserListResponseDTOList))
    }catch(e){
      next(e)
    }
  }

  async patchAdmin(req,res,next) {
    try{

      const [data] = await this.service.updateUser(parseInt(req.body.userUid))

      res.status(200).json(new OK(data))

    }catch(e){
      next(e)
    }
  }

}


module.exports = AdminController