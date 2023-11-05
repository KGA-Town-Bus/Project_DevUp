const httpMocks = require("node-mocks-http");
const BoardController = require("./board.controller");
const boardService = require("./board.service");

jest.mock("./board.service");

describe("BoardController", () => {
  let boardService;
  let boardController;

  beforeEach(() => {
    boardService = require("./board.service"); // 모킹된 서비스를 가져옵니다.
    boardController = new BoardController(boardService);
    boardService.findAllPost = jest.fn();
    boardService.createPost = jest.fn();
    boardService.findOnePost = jest.fn();
    boardService.updatePost = jest.fn();
    boardService.deletePost = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe("postCreate", () => {
    it("게시글 생성 후 생성된 게시물의 정보 반환", async () => {
      const mockRequestBody = {
        postTitle: "Test Title",
        postContent: "Test Content",
        postWriter: "Test Writer",
      };
      const mockResponseData = {
        postUid: 1,
        postTitle: "Test Title",
        postContent: "Test Content",
        postWriter: "Test Writer",
        postCreatedAt: new Date().toISOString().slice(0, 10),
      };

      boardService.createPost.mockResolvedValue(mockResponseData);

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/posts",
        body: mockRequestBody,
      });
      const response = httpMocks.createResponse();
      await boardController.postCreate(request, response);

      const parsedResponseData = JSON.parse(response._getData());
      expect(response._getStatusCode()).toBe(201);
      expect(parsedResponseData).toEqual(mockResponseData);
    });
    it("게시글 생성 실패", async () => {
      const mockRequestBody = {
        postTitle: "Test Title",
        postContent: "Test Content",
        postWriter: "Test Writer",
      };
      const mockError = new Error("Database error");

      boardService.createPost.mockRejectedValue(mockError);

      const request = httpMocks.createRequest({
        method: "POST",
        url: "/posts",
        body: mockRequestBody,
      });
      const response = httpMocks.createResponse();
      const nextMock = jest.fn();

      await boardController.postCreate(request, response, nextMock);

      expect(nextMock).toHaveBeenCalledWith(mockError);
    });
  });

  describe("getAllPost", () => {
    it("모든 게시글을 반환", async () => {
      const mockPosts = [
        {
          postUid: 1,
          postTitle: "Test Title 1",
          postContent: "Test Content 1",
          postWriter: "Test Writer 1",
          postCreatedAt: new Date().toISOString(),
        },
        {
          postUid: 2,
          postTitle: "Test Title 2",
          postContent: "Test Content 2",
          postWriter: "Test Writer 2",
          postCreatedAt: new Date().toISOString(),
        },
      ];

      boardService.findAllPost.mockResolvedValue(mockPosts);
      const mockRequestBody = {
        postUid: 1,
      };
      const request = httpMocks.createRequest({
        body: mockRequestBody,
      });
      const response = httpMocks.createResponse();
      const nextMock = jest.fn();

      await boardController.getAllPost(request, response, nextMock);

      const responseData = JSON.parse(response._getData());
      expect(response._getStatusCode()).toBe(201);
      expect(responseData).toEqual(mockPosts);
    });
    it("모든 게시글 조회 실패", async () => {
      const mockError = new Error("Database error");
      boardService.findAllPost.mockRejectedValue(mockError);
      const request = httpMocks.createRequest();
      const response = httpMocks.createResponse();
      const nextMock = jest.fn();

      await boardController.getAllPost(request, response, nextMock);

      expect(nextMock).toHaveBeenCalled();
      const errorPassedToNext = nextMock.mock.calls[0][0];
      expect(errorPassedToNext).toBeInstanceOf(Error);
    });
  });
  describe("getPost", () => {
    it("특정 게시글을 반환", async () => {
      const mockPost = {
        postUid: 1,
        postTitle: "Test Title 1",
        postContent: "Test Content 1",
        postWriter: "Test Writer 1",
        postCreatedAt: new Date().toISOString(),
      };

      boardService.findOnePost.mockResolvedValue(mockPost);

      const request = httpMocks.createRequest({
        method: "GET",
        url: `/posts/${mockPost.postUid}`,
        params: {
          uid: mockPost.postUid.toString(),
        },
      });

      const response = httpMocks.createResponse();
      const nextMock = jest.fn();

      await boardController.getPost(request, response, nextMock);

      const responseData = JSON.parse(response._getData());
      expect(response._getStatusCode()).toBe(201);
      expect(responseData).toEqual(mockPost);
    });
    it("특정 게시글 조회 실패", async () => {
      const mockPostUid = 1;
      const mockError = new Error("Database error");
      boardService.findOnePost.mockRejectedValue(mockError);

      const request = httpMocks.createRequest({
        method: "GET",
        url: `/posts/${mockPostUid}`,
        params: {
          uid: mockPostUid.toString(),
        },
      });
      const response = httpMocks.createResponse();
      const nextMock = jest.fn();

      await boardController.getPost(request, response, nextMock);

      expect(nextMock).toHaveBeenCalledWith(mockError);
    });
  });
  describe("updatePost", () => {
    it("특정 게시글을 업데이트하고 반환", async () => {
      const mockPost = {
        postUid: 1,
        postTitle: "Updated Title",
        postContent: "Updated Content",
      };

      const result = boardService.updatePost.mockResolvedValue(mockPost);
      console.log(boardService.updatePost.mock.calls.length); // 호출 횟수

      const request = httpMocks.createRequest({
        method: "PUT",
        url: `/posts/${mockPost.postUid}`,
        params: {
          uid: mockPost.postUid.toString(),
        },
        body: {
          postTitle: "Updated Title",
          postContent: "Updated Content",
        },
      });

      const response = httpMocks.createResponse();
      const nextMock = jest.fn();

      await boardController.updatePost(request, response, nextMock);

      const rawResponseData = response._getData();
      const responseData = rawResponseData ? JSON.parse(rawResponseData) : {};

      expect(response._getStatusCode()).toBe(201);
      expect(responseData).toEqual(mockPost);
    });
    it("특정 게시글 업데이트 실패", async () => {
      const mockPostUid = 1;
      const mockError = new Error("Database error");

      boardService.updatePost.mockRejectedValue(mockError);

      const request = httpMocks.createRequest({
        method: "PUT",
        url: `/posts/${mockPostUid}`,
        params: {
          uid: mockPostUid.toString(),
        },
        body: {
          postTitle: "Updated Title",
          postContent: "Updated Content",
        },
      });
      const response = httpMocks.createResponse();
      const nextMock = jest.fn();

      await boardController.updatePost(request, response, nextMock);

      expect(nextMock).toHaveBeenCalledWith(mockError);
    });
  });
  describe("deletePost", () => {
    it("특정 게시글을 삭제하고 결과를 반환", async () => {
      const mockPostUid = 1;

      boardService.deletePost.mockResolvedValue({
        message: "Post deleted successfully",
      });

      const request = httpMocks.createRequest({
        method: "DELETE",
        url: `/posts/${mockPostUid}`,
        params: {
          uid: mockPostUid.toString(),
        },
      });

      const response = httpMocks.createResponse();
      const nextMock = jest.fn();

      await boardController.deletePost(request, response, nextMock);

      const responseData = JSON.parse(response._getData());

      expect(response._getStatusCode()).toBe(201);
      expect(responseData).toEqual({ message: "Post deleted successfully" });
    });
    it("특정 게시글 삭제 실패", async () => {
      const mockPostUid = 1;
      const mockError = new Error("Database error");

      boardService.deletePost.mockRejectedValue(mockError);

      const request = httpMocks.createRequest({
        method: "DELETE",
        url: `/posts/${mockPostUid}`,
        params: {
          uid: mockPostUid.toString(),
        },
      });

      const response = httpMocks.createResponse();
      const nextMock = jest.fn();

      await boardController.deletePost(request, response, nextMock);

      expect(nextMock).toHaveBeenCalledWith(mockError);
    });
  });
});
