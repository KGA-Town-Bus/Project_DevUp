const express =require("express")
const app = express()
const router = require("./src/index")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()


const {swaggerUi ,backSpecs} = require("./swagger/swagger")
const {auth} = require("./src/lib/jwtAuthMiddleware");
const {BadRequest} = require("./src/lib/customException");
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("backend/uploads"))

const PROTOCOL = process.env.PROTOCOL

const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000", "https://devup.hyunjun.kr"]

app.use(cors({
  origin: allowedOrigins,
  method: "GET,POST,OPTIONS,PUT,DELETE,UPDATE",
  credentials: true
}))

app.use(cookieParser());
app.use(auth)
app.use(router)

app.use("/api-docs", swaggerUi.serveFiles(backSpecs), swaggerUi.setup(backSpecs, {explorer: true}))



app.use((error, req, res, next) => {
  if(error.errorMessage === "이메일 인증을 진행해 주세요.") return res.redirect(`${PROTOCOL}://${process.env.FRONTEND_SERVER_IP}:${process.env.FRONTEND_SERVER_PORT}?error=email 인증을 진행해 주세요.`)
  if(error.errorMessage === "입력 값을 확인해 주세요.") return res.redirect(`${PROTOCOL}://${process.env.FRONTEND_SERVER_IP}:${process.env.FRONTEND_SERVER_PORT}/users/login?error=입력 값을 확인해 주세요.`)

  res.status(error.statusCode).json(error);
})





module.exports = app

