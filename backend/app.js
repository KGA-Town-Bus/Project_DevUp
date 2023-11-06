const express =require("express")
const app = express()
const router = require("./src/index")
const {swaggerUi ,backSpecs} = require("./swagger/swagger")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)

app.use("/api-docs", swaggerUi.serveFiles(backSpecs), swaggerUi.setup(backSpecs, {explorer: true}))



app.use((error, req, res, next) => {

  res.status(error.statusCode).json(error);
})





module.exports = app

