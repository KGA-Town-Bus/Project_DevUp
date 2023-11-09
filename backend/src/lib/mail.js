const nodemailer = require("nodemailer")
require("dotenv").config()
const user = process.env.EMAIL_USER
const pass = process.env.EMAIL_PASS

const mailSender = {
  sendGmail: function (param) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,
        pass: pass
      }
    });

    let mailOptions = {
      from: user,
      to: param.toEmail,
      subject: param.subject,
      html: param.text
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  }
}

module.exports = mailSender;