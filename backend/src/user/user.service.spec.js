const UserService = require("./user.service")
const axios = require("axios");

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


describe("File:: user.service.js", () => {
  let userService = null;
  let User = {
    build: jest.fn()
  }

  beforeEach(() => {
    userService = new UserService(User);
  });

  describe("Method:: signup", () => {

    describe("응답 확인", () => {
      it("응답 성공", async() => {
        User.build.mockReturnValue({correctReturnData, save:jest.fn()})
        const save = User.build().save
        save.mockResolvedValue({correctReturnData})


        const dto = correctRequestData
        const response = await userService.signup(dto)

        expect(response).toStrictEqual({correctReturnData})
      })

      it("응답 실패", async() => {
        User.build.mockReturnValue({correctReturnData, save:jest.fn()})
        const save = User.build().save
        save.mockRejectedValue(new Error("userRepository Error"))

        const dto = wrongRequestData

        expect(
            async () => await userService.signup(dto)
        ).rejects.toThrowError("userRepository Error")

      })
    })
  })


  describe("Method:: login", () => {

    describe('카카오 로그인', () => {

    });



  })


})






