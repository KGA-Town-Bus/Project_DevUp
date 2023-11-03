
class UserService {
  constructor(User) {
    this.User = User
  }

  async signup (dto)  {
    try{
      const userEntity = this.User.build({
        Users_id: dto.userId,
        Users_password: dto.userPassword,
        Users_name: dto.userName,
        Users_nickname: dto.userNickname,
        Users_provider: "service",
        Users_created_at: Date.now(),
        Users_account_locked: false,
        Users_email: dto.userEmail,
        //todo
        Users_profile: "https://test.com/image01.png",
        Role_authority: "user",
      });


      const response = userEntity.save()

      return response
    }catch(e){
      console.log(e.message)
      throw new Error(e.message)
    }
  }
}


module.exports = UserService