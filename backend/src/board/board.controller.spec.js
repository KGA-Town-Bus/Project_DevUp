const httpMocks = require('node-mocks-http');
const BoardController = require('./board.controller');

jest.mock('./board.service');

describe('BoardController', () => {
  let boardService;
  let boardController;

  const methodsToMock = [
    'findAllPost',
    'createPost',
    'findOnePost',
    'incrementHit',
    'updatePost',
    'deletePost',
    'addLike',
    'removeLike',
    'fineComment',
  ];

  beforeEach(() => {
    boardService = require('./board.service');
    boardController = new BoardController(boardService);

    methodsToMock.forEach(method => {
      boardService[method] = jest.fn();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('postCreate', () => {
    it('게시글 생성 후 리다이렉트 성공', async () => {
      const mockRequestBody = {
        postTitle: 'Test Title',
        postContent: 'Test Content',
        postWriter: 'Test Writer',
      };
      const mockResponseData = {
        postUid: 1,
        postTitle: 'Test Title',
        postContent: 'Test Content',
        postWriter: 'Test Writer',
        postCreatedAt: new Date().toISOString().slice(0, 10),
      };

      boardService.createPost.mockResolvedValue(mockResponseData);

      const request = httpMocks.createRequest({
        method: 'POST',
        url: '/posts',
        body: mockRequestBody,
      });
      const response = httpMocks.createResponse();
      await boardController.postCreate(request, response);

      expect(response._getStatusCode()).toBe(302);
      expect(response._getHeaders().location).toBe(
        `/posts/${mockResponseData.postUid}`,
      );
    });
    it('게시글 생성 실패', async () => {
      const mockRequestBody = {
        postTitle: 'Test Title',
        postContent: 'Test Content',
        postWriter: 'Test Writer',
      };
      const mockError = new Error('Database error');

      boardService.createPost.mockRejectedValue(mockError);

      const request = httpMocks.createRequest({
        method: 'POST',
        url: '/posts',
        body: mockRequestBody,
      });
      const response = httpMocks.createResponse();
      const nextMock = jest.fn();

      await boardController.postCreate(request, response, nextMock);

      expect(nextMock).toHaveBeenCalledWith(mockError);
    });
  });

  describe('getAllPost', () => {
    it('모든 게시글 조회', async () => {
      const mockPosts = [
        {
          postUid: 1,
          postTitle: 'Test Title 1',
          postContent: 'Test Content 1',
          postWriter: 'Test Writer 1',
          postCreatedAt: new Date().toISOString(),
        },
        {
          postUid: 2,
          postTitle: 'Test Title 2',
          postContent: 'Test Content 2',
          postWriter: 'Test Writer 2',
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
    it('모든 게시글 조회 실패', async () => {
      const mockError = new Error('Database error');
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
  describe('getPost', () => {
    it('특정 게시글 조회', async () => {
      const mockPost = {
        postUid: 1,
        postTitle: 'Test Title 1',
        postContent: 'Test Content 1',
        postWriter: 'Test Writer 1',
        postCreatedAt: new Date().toISOString(),
      };

      const mockComments = [
        {
          commentUid: 1,
          postUid: 1,
          content: 'Test Content 1',
          writer: 'Comment Wrtier 1',
        },
        {
          commentUid: 2,
          postUid: 2,
          content: 'Test Content 2',
          writer: 'Comment Wrtier 2',
        },
      ];

      boardService.fineComment.mockResolvedValue(mockComments);
      boardService.findOnePost.mockResolvedValue(mockPost);
      boardService.incrementHit.mockResolvedValue(); // 조회수 증가 메서드 모킹

      const request = httpMocks.createRequest({
        method: 'GET',
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
      expect(boardService.incrementHit).toHaveBeenCalledWith(
        mockPost.postUid.toString(),
      );
    });
    it('특정 게시글 조회 실패', async () => {
      const mockPostUid = 1;
      const mockError = new Error('Database error');
      boardService.findOnePost.mockRejectedValue(mockError);

      const request = httpMocks.createRequest({
        method: 'GET',
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
  describe('updatePost', () => {
    it('특정 게시글을 업데이트 후 리다이렉트', async () => {
      const mockPost = {
        postUid: 1,
        postTitle: 'Updated Title',
        postContent: 'Updated Content',
      };
      boardService.updatePost.mockResolvedValue(mockPost);

      const request = httpMocks.createRequest({
        method: 'PUT',
        url: `/posts/${mockPost.postUid}`,
        params: {
          uid: mockPost.postUid.toString(),
        },
        body: {
          postTitle: 'Updated Title',
          postContent: 'Updated Content',
        },
      });
      const response = httpMocks.createResponse();

      await boardController.putUpdatePost(request, response);

      expect(response._getStatusCode()).toBe(302);
      expect(response.getHeader('Location')).toBe(`/posts/${mockPost.postUid}`);
    });

    it('특정 게시글 업데이트 실패', async () => {
      const mockPostUid = 1;
      const mockError = new Error('Database error');

      boardService.updatePost.mockRejectedValue(mockError);

      const request = httpMocks.createRequest({
        method: 'PUT',
        url: `/posts/${mockPostUid}`,
        params: {
          uid: mockPostUid.toString(),
        },
        body: {
          postTitle: 'Updated Title',
          postContent: 'Updated Content',
        },
      });
      const response = httpMocks.createResponse();
      const nextMock = jest.fn();

      await boardController.putUpdatePost(request, response, nextMock);

      expect(nextMock).toHaveBeenCalledWith(mockError);
    });
  });
  describe('deletePost', () => {
    it('특정 게시글을 삭제 성공', async () => {
      const mockPostUid = 1;

      boardService.deletePost.mockResolvedValue({
        message: 'Post deleted successfully',
      });

      const request = httpMocks.createRequest({
        method: 'DELETE',
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
      expect(responseData).toEqual({message: 'Post deleted successfully'});
    });
    it('특정 게시글 삭제 실패', async () => {
      const mockPostUid = 1;
      const mockError = new Error('Database error');

      boardService.deletePost.mockRejectedValue(mockError);

      const request = httpMocks.createRequest({
        method: 'DELETE',
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
  describe('postLiked', () => {
    it('좋아요 추가 성공', async () => {
      const mockPostUid = 1;
      const mockUserUid = 123;

      const request = httpMocks.createRequest({
        method: 'POST',
        url: `/like/${mockPostUid}`,
        params: {uid: mockPostUid.toString()},
        user: {uid: mockUserUid},
      });

      const response = httpMocks.createResponse();
      const nextMock = jest.fn();

      await boardController.postLiked(request, response, nextMock);

      expect(boardService.addLike).toHaveBeenCalledWith(
        mockPostUid,
        mockUserUid,
      );
      expect(response._getStatusCode()).toBe(201);
      expect(JSON.parse(response._getData())).toEqual({message: '좋아요 추가'});
    });
  });
  describe('deleteLiked', () => {
    it('좋아요 취소 성공', async () => {
      const mockPostUid = 1;
      const mockUserUid = 123;

      const request = httpMocks.createRequest({
        method: 'DELETE',
        url: `/unlike/${mockPostUid}`,
        params: {uid: mockPostUid.toString()},
        user: {uid: mockUserUid},
      });

      const response = httpMocks.createResponse();
      const nextMock = jest.fn();

      await boardController.deleteLiked(request, response, nextMock);

      expect(boardService.removeLike).toHaveBeenCalledWith(
        mockPostUid,
        mockUserUid,
      );
      expect(response._getStatusCode()).toBe(201);
      expect(JSON.parse(response._getData())).toEqual({message: '좋아요 취소'});
    });
  });
});
