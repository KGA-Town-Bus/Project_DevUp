class UserController {
  constructor(service) {
    this.service = service
  }
  async getSignup(req, res, next)  {
    try{


      res.render("signup/signup.html")
    }catch(e){
      next(e)
    }
  }
}


module.exports = UserController