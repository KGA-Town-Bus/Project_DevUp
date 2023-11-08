const express =require("express")
const app = express()
const router = require("./src/index")
const cors = require("cors")

const {swaggerUi ,backSpecs} = require("./swagger/swagger")
const {auth} = require("./src/lib/jwtAuthMiddleware");
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("backend/uploads"))

const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000", "https://devup.hyunjun.kr"]
app.use(cors({
  origin: allowedOrigins,
  method: "GET,POST,OPTIONS,PUT,DELETE,UPDATE",
  credentials: true
}))
app.use(auth)
app.use(router)

app.use("/api-docs", swaggerUi.serveFiles(backSpecs), swaggerUi.setup(backSpecs, {explorer: true}))



app.use((error, req, res, next) => {

  res.status(error.statusCode).json(error);
})





module.exports = app

