const UserController = require("./user.controller")
const userService = require("./user.service")

const http = require("node-mocks-http");
const {UserSignupRequestDTO} = require("./dto/user.signup.request.dto");
const {BadRequest} = require("./exception/customException");
const {Logger} = require("sequelize/lib/utils/logger");
const correctRequestData = {
  userId: "testId",
  userPassword: "testPassword",
  userName: "testName",
  userNickname: "testNickname",
  userProfile: "이미지 데이터",
  userEmail:"abcd@naver.com"
}
const wrongRequestData = {
  userId: "testId",
  userPassword: "testPassword",
  // userName: "testName",
  userNickname: "testNickname",
  userProfile: "이미지 데이터",
  userEmail:"abcd@naver.com"

}

const correctReturnData = {
  userId: "testId",
  userName: "testName",
  userNickname: "testNickname",
  userProvider: "service",
  userCreatedAt: Date.now(),
  userAccountLocked: false,
  userProfile: "http://abcd/image1.png",
  roleAuthority: "user",
  userEmail:"abcd@naver.com"
}



describe("File:: user.controller.js", () => {

  let req, res, next
  userService.signup = jest.fn()
  const userController = new UserController(userService)

  beforeEach(() => {
    req = http.createRequest();
    res = http.createResponse();
    next = jest.fn();
  });

  it("Controller:: 유무 확인", () => {
    expect(typeof userController).toBe("object")
  })

  describe("Method:: postSignup()", () => {

    const postSignup = userController.postSignup

    it("메서드 유무 확인", () => {
      expect(typeof postSignup).toBe("function")
    })

    describe("요청 바디 검증", () => {
      it("요청 바디 검증 성공", async() => {
        const {UserSignupRequestDTO} = require("./dto/user.signup.request.dto")
        new UserSignupRequestDTO(correctRequestData)
      })

      it("요청 바디 검증 실패", async() => {

        const {UserSignupRequestDTO} = require("./dto/user.signup.request.dto")
        expect(() => {
          new UserSignupRequestDTO(wrongRequestData)
        }).toThrow()
      })
    })


    describe("Service:: userService.signup", () =>{

      it("메서드 유무 확인", () => {
        expect(typeof userService.signup).toBe("function")
      })

      it("응답 확인", async() => {
        const response = Promise.resolve(correctReturnData)
        userService.signup.mockReturnValue(response);

        req.body = correctRequestData
        await userController.postSignup(req,res,next)

        expect(res.statusCode).toBe(201)
        expect(res._isEndCalled()).toBe(true)
        expect(res._getJSONData()).toStrictEqual(correctReturnData)
      })

    })

  })

})







































