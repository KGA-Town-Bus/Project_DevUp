const UserService = require("./user.service")

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

  it("Service:: 유무 확인", () => {
    expect(typeof userService).toBe("object")
  })


  describe("Method:: signup", () => {
    it("메서드 유무 확인", () => {
      expect(typeof userService.signup).toBe("function")
    })

    describe("응답 확인", () => {
      it("응답 성공", async() => {
        User.build.mockResolvedValue(correctReturnData)
        const dto = correctRequestData
        const response = await userService.signup(dto)

        expect(User.build).toBeCalledWith(dto)
        expect(response).toStrictEqual(correctReturnData)
      })

      it("응답 실패", async() => {
        User.build.mockResolvedValue({save: jest.fn})

        User.build.save.mockRejectedValue(new Error("User Error"))


        // User.build.mockRejectedValue(new Error("User Error"))

        const dto = wrongRequestData

        expect(
            async () => await userService.signup(dto)
        ).rejects.toThrowError("User Error")

      })
    })


  })

})




























