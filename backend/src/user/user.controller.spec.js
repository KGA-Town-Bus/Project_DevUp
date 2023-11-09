const axios = require("axios");
const userService = require("./user.service");
describe('Test', () => {

  let data = require("./user.controller.test.json")

  const userService = require("./user.service")
  const UserController = require("./user.controller")
  let userController;
  const {UserSignupRequestDTO} = require("./dto/user.signup.request.dto");
  const http = require("node-mocks-http");
  let req, res, next

  beforeAll(() => {
    userController = new UserController(userService)
  })

  beforeEach(() => {
    userService.signup = jest.fn()
    userService.login = jest.fn()
    req = http.createRequest();
    res = http.createResponse();
    next = jest.fn();
  })

  describe("Method:: postSignup()", () => {

    let postSignup;
    beforeAll(() => {
      postSignup = userController.postSignup
    })

    describe("요청 바디 검증", () => {
      it("요청 바디 검증 성공", async () => {
        new UserSignupRequestDTO(data.correctRequestData)
      })

      it("요청 바디 검증 실패", async () => {
        expect(() => {
          new UserSignupRequestDTO(data.wrongRequestData)
        }).toThrow()
      })
    })

    describe("Service:: userService.signup", () => {
      it("응답 확인", async () => {
        const response = Promise.resolve(data.correctReturnData)
        userService.signup.mockReturnValue(response);

        req.body = data.correctRequestData
        await userController.postSignup(req, res, next)

        expect(res.statusCode).toBe(201)
        expect(res._isEndCalled()).toBe(true)
        expect(res._getJSONData()).toStrictEqual(data.correctReturnData)
      })
    })
  })

  describe("Method:: login()", () => {
    let login;

    beforeAll(() => {
      login = userController.login
    })

    test("req.params 테스트", async () => {
      req.params.provider = "kakao"
      req.query.code = "kakao-response-test-code"

      userService.login.mockResolvedValue({
        data: {accessToken: "abcd.abcd.abcd"}
      })

      const {data:{accessToken}} = await userService.login()

      expect(accessToken).toBe("abcd.abcd.abcd")

    })
  })
});


/**
 * const axios = require("axios");
 * const userService = require("./userService");
 *
 * test("findOne returns what axios get returns", async () => {
 *   axios.get = jest.fn().mockResolvedValue({
 *     data: {
 *       id: 1,
 *       name: "Dale Seo",
 *     },
 *   });
 *
 *   const user = await userService.findOne(1);
 *   expect(user).toHaveProperty("id", 1);
 *   expect(user).toHaveProperty("name", "Dale Seo");
 * });
 */










