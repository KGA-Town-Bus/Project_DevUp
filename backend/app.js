const express =require("express")
const app = express()
const router = require("./src/index")
const {swaggerUi ,backSpecs} = require("./swagger/swagger")
app.use(express.json())
app.use(router)

app.use("/api-docs", swaggerUi.serveFiles(backSpecs), swaggerUi.setup(backSpecs, {explorer: true}))



module.exports = app

