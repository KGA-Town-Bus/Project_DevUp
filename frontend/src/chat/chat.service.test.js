const BoardService = require('./board.service');
const axios = require('axios');

jest.mock('axios');

describe('BoardService', () => {
  it('게시글 생성', async () => {
    const mockPostData = {
      postTitle: 'Test Title',
      postContent: 'Test Content',
      postWriter: 'Test Writer',
    };
    const mockResponse = {data: {id: 1, ...mockPostData}};

    axios.post.mockResolvedValue(mockResponse);

    const boardService = new BoardService();
    const data = await boardService.createPost(mockPostData);

    expect(data).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/posts'),
      mockPostData,
    );
  });

  it('모든 게시글 조회', async () => {
    const mockPosts = [
      {id: 1, postTitle: 'Test'},
      {id: 2, postTitle: 'Another Test'},
    ];
    const mockResponse = {data: mockPosts};

    axios.get.mockResolvedValue(mockResponse);

    const boardService = new BoardService();
    const data = await boardService.findAllPost();

    expect(data).toEqual(mockPosts);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/posts'));
  });

  it('특정 게시글 조회', async () => {
    const postUid = 1;
    const mockPost = {id: postUid, postTitle: 'Test', postContent: 'Content'};
    const mockResponse = {data: mockPost};

    axios.get.mockResolvedValue(mockResponse);

    const boardService = new BoardService();
    const data = await boardService.findOnePost(postUid);

    expect(data).toEqual(mockPost);

    expect(axios.get).toHaveBeenCalledWith(
      `http://localhost:4000/posts/${postUid}`,
    );
  });

  it('게시글 업데이트', async () => {
    const postUid = 1;
    const mockUpdateData = {
      postTitle: 'Updated Title',
      postContent: 'Updated Content',
    };
    const mockResponse = {data: {...mockUpdateData, postUid}};

    axios.put.mockResolvedValue(mockResponse);

    const boardService = new BoardService();
    const data = await boardService.updatePost(postUid, mockUpdateData);

    expect(data).toEqual(mockResponse.data);
    expect(axios.put).toHaveBeenCalledWith(
      expect.stringContaining(`/posts/${postUid}`),
      mockUpdateData,
    );
  });

  it('게시글 삭제 성공', async () => {
    const postUid = 1;
    const mockResponse = {data: {message: 'deleted success'}};

    axios.delete.mockResolvedValue(mockResponse);

    const boardService = new BoardService();
    const data = await boardService.deletePost(postUid);

    expect(data).toEqual(mockResponse.data);
    expect(axios.delete).toHaveBeenCalledWith(
      expect.stringContaining(`/posts/${postUid}`),
    );
  });
  it('조회수 증가', async () => {
    const postUid = 1;
    const mockResponse = {data: {views: 1}};

    axios.patch.mockResolvedValue(mockResponse);

    const boardService = new BoardService();
    await boardService.incrementViews(postUid);

    expect(axios.patch).toHaveBeenCalledWith(
      expect.stringContaining(`/posts/${postUid}/views`),
    );
  });

  it('좋아요 동작', async () => {
    const postUid = 1;
    const mockResponse = {data: {message: 'like added'}};

    axios.patch.mockResolvedValue(mockResponse);

    const boardService = new BoardService();
    await boardService.likePost(postUid);

    expect(axios.patch).toHaveBeenCalledWith(
      expect.stringContaining(`/posts/${postUid}/like`),
    );
  });
});
