const frontApp = require("./frontend/app")
const backApp = require("./backend/app")
require("dotenv").config()

const {swaggerUi ,specs} = require("./swagger/swagger")


frontApp.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}))
backApp.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}))


const frontPort = process.env.FRONTEND_SERVER_PORT
const backPort = process.env.BACKEND_SERVER_PORT



frontApp.listen(frontPort, () => {
  console.log(`Frontend START: ${frontPort}`)
})

backApp.listen(backPort, () => {
  console.log(`Backend START: ${backPort}`)

})




