const express = require("express")
const userRouter = express.Router()

const {userController} = require("./user.module")
const postSignup = userController.postSignup.bind(userController)
const login = userController.login.bind(userController)


/**
 * @swagger
 *  /users:
 *    post:
 *      tags:
 *      - userRepository
 *      description: 유저
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                userId:
 *                  type: string
 *                  description: 사용자 아이디
 *                  example: john1234
 *                userPassword:
 *                  type: string
 *                  description: 사용자 비밀번호
 *                  example: john1234!
 *                userName:
 *                  type: string
 *                  description: 사용자 이름
 *                  example: 황현준
 *                userNickname:
 *                  type: string
 *                  description: 사용자 닉네임
 *                  example: 현준123
 *                userEmail:
 *                  type: string
 *                  description: 사용자 이메일
 *                  example: abcd@naver.com
 *                userProfile:
 *                  type: string
 *                  description: 유저 프로필 사진
 *                  example: 바이너리 데이터
 *      responses:
 *       200:
 *        description: 성공
 *       400:
 *        description: 실패
 */
userRouter.post("/", postSignup)

userRouter.get("/:provider", login)
userRouter.post("/:provider", login)


module.exports = userRouter

