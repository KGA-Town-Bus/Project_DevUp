require("dotenv").config()

const frontApp = require("./frontend/app")
const backApp = require("./backend/app")


const frontPort = process.env.FRONTEND_SERVER_PORT
const backPort = process.env.BACKEND_SERVER_PORT


frontApp.listen(frontPort, () => {
  console.log(`Frontend START: ${frontPort}`)
})

backApp.listen(backPort, () => {
  console.log(`Backend START: ${backPort}`)
})



