const express =require("express")
const app = express()
const router = require("./src/index")


app.use(express.json())
app.use(router)


module.exports = app