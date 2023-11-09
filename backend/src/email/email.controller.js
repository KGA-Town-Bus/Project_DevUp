const FRONTEND_SERVER_IP = process.env.FRONTEND_SERVER_IP
const FRONTEND_SERVER_PORT = process.env.FRONTEND_SERVER_PORT
const PROTOCOL = process.env.PROTOCOL

class EmailController {
  constructor(service) {
    this.service = service
  }

  async getMailLink(req, res, next) {
    try{
      const code = req.params.code

      const result = await this.service.linkAuth(code)

      if (result === 1) res.redirect(`${PROTOCOL}://${FRONTEND_SERVER_IP}:${FRONTEND_SERVER_PORT}/`)

    }catch(e){
      next(e)
    }
  }


}

module.exports = EmailController