const mailer = require("../lib/mail");
const {UserSignupResponseDTO} = require("../user/dto/user.signup.response.dto");
const {where} = require("sequelize");


const ENV = process.env.ENV
const BACKEND_SERVER_IP = process.env.BACKEND_SERVER_IP
const BACKEND_SERVER_PORT = process.env.BACKEND_SERVER_PORT
const PROTOCOL = process.env.PROTOCOL

class EmailService {
  constructor(Email, Users) {
    this.emailRepository = Email
    this.userRepository = Users
  }

  async mailSend(DTO) {
    try {
      const link = linkGenerator(DTO.userUid)

      const emailEntity = this.emailRepository.build({
        Mail_link: link,
        Users_uid: DTO.userUid,
      })

      const result = await emailEntity.save();

      let emailParam = {
        toEmail: DTO.userEmail,
        subject: "Devup 인증 이메일 입니다.",
        text: `<h1>Devup..</h1>
            <h2>인증을 원하시면 아래의 링크를 클릭해 주세요.</h2>
            <a href='${link}'>인증 링크</a>`,
      }

      mailer.sendGmail(emailParam)

    } catch (e) {
      throw e
    }
  }

  async linkAuth(link) {
    try {
      const userUid = codeToString(link)

      const [result1] = await this.emailRepository.update(
          {Mail_check: true},
          {
            where: {
              Users_uid: userUid
            }
          }
      )


      const [result2] = await this.userRepository.update(
          {Users_account_locked: false},
          {
            where:{
              Users_uid: userUid
            }
          }
      )

      return result2
    } catch (e) {
      throw e
    }
  }

}


const linkGenerator = (userUid) => {
  const prefix = `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/email/`
  const suffix = Buffer.from(userUid.toString()).toString("base64")
  return prefix + suffix
}

const codeToString = (code) => {
  return Buffer.from(code, "base64").toString()
}

module.exports = EmailService