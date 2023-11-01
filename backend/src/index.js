const express = require("express")
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: plan
 *   description: 계획 정보 관리
 */
router.get("/", (req, res, next) => {

  res.send("test!")
})

module.exports = router