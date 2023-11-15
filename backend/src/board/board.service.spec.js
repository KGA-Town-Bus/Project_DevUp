const boardService = require('./board.service').getInstance();
const db = require('../lib/db');
const {
  PostCreateRequestDTO,
  PostCreateResponseDTO,
  PostReadRequestDTO,
  PostReadAllResponseDTO,
  PostUpdateRequestDTO,
  PostUpdateResponseDTO,
  PostDeleteRequestDTO,
} = require('./dto/board.dto');

jest.mock('../lib/db');

describe('BoardService', () => {
  beforeEach(() => {
    db.Posts.create = jest.fn().mockResolvedValue({
      postUid: 1,
      postTitle: 'Test title',
      postContent: 'Test content',
      postWriter: 'Test writer',
    });
    db.Posts.create = jest.fn();
    db.Posts.update = jest.fn();
    db.Posts.destroy = jest.fn();

    db.Posts.create.mockResolvedValue({});

    db.Posts.update.mockResolvedValue({});

    db.Posts.destroy.mockResolvedValue(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('createPost', () => {
    it('createPost 동작 성공', async () => {
      const newPost = {
        postTitle: 'Test title',
        postContent: 'Test content',
        postWriter: 'Test writer',
      };
      const createdPost = {...newPost, postUid: 1};

      const responsePost = {
        Posts_title: newPost.postTitle,
        Posts_content: newPost.postContent,
        Posts_writer: newPost.postWriter,
      };
      db.Posts.create.mockResolvedValue(createdPost);

      const result = await boardService.createPost(
        new PostCreateRequestDTO(newPost),
      );

      expect(result).toEqual(new PostCreateResponseDTO(createdPost));

      expect(db.Posts.create).toHaveBeenCalledWith(responsePost);

      expect(result.postUid).toBe(createdPost.postUid);
    });

    it('createPost 동작 실패', async () => {
      const newPost = {
        postTitle: 'Test title',
        postContent: 'Test content',
        postWriter: 'Test writer',
      };
      const mockError = new Error('Database error');
      db.Posts.create.mockRejectedValue(mockError);

      try {
        await boardService.createPost(new PostCreateRequestDTO(newPost));
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Database error');
      }
    });
  });

  describe('findAllPost', () => {
    it('findAllPost 동작 완료', async () => {
      const posts = [
        {
          postUid: 1,
          postTitle: 'Title 1',
          postContent: 'Content 1',
          postWriter: 'Writer 1',
          postCreatedAt: new Date(),
        },
        {
          postUid: 2,
          postTitle: 'Title 2',
          postContent: 'Content 2',
          postWriter: 'Writer 2',
          postCreatedAt: new Date(),
        },
      ];
      db.Posts.findAll.mockResolvedValue(posts);

      const result = await boardService.findAllPost();
      expect(result).toEqual(
        posts.map(post => new PostReadAllResponseDTO(post)),
      );
      expect(db.Posts.findAll).toHaveBeenCalled();
    });
    it('findAllPost 동작 실패', async () => {
      const mockError = new Error('Database error');
      db.Posts.findAll.mockRejectedValue(mockError);

      try {
        await boardService.findAllPost();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Database error');
      }
    });
  });

  describe('findOnePost', () => {
    it('findOnePost 동작 완료', async () => {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1,
      ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(1)}`;

      const mockPost = {
        Posts_uid: 1,
        Posts_title: 'Title 1',
        Posts_content: 'Content 1',
        Posts_writer: 'Writer 1',
        Posts_created_at: formattedDate,
      };
      db.Posts.findOne.mockResolvedValue(mockPost);

      const result = await boardService.findOnePost(
        new PostReadRequestDTO({postUid: mockPost.Posts_uid}),
      );

      const expectedPost = {
        postUid: 1,
        postTitle: 'Title 1',
        postContent: 'Content 1',
        postWriter: 'Writer 1',
        postCreatedAt: formattedDate,
      };

      expect(result).toEqual(expectedPost);
      expect(db.Posts.findOne).toHaveBeenCalledWith({
        where: {Posts_uid: mockPost.Posts_uid},
      });
    });
    it('findOnePost 동작 실패', async () => {
      const mockError = new Error('Database error');
      db.Posts.findOne.mockRejectedValue(mockError);

      try {
        await boardService.findOnePost(new PostReadRequestDTO({postUid: 1}));
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Database error');
      }
    });
  });

  describe('updatePost', () => {
    it('updatePost 동작 완료', async () => {
      const postUpdateRequestDTO = new PostUpdateRequestDTO({
        postUid: 1,
        postTitle: 'Updated title',
        postContent: 'Updated content',
      });

      const mockUpdatedPost = {
        Posts_uid: 1,
        Posts_title: 'Updated title',
        Posts_content: 'Updated content',
        Posts_created_at: new Date(),
      };

      db.Posts.update.mockResolvedValue([1]);
      db.Posts.findOne.mockResolvedValue(mockUpdatedPost);

      const result = await boardService.updatePost(postUpdateRequestDTO);

      const expectedResponse = new PostUpdateResponseDTO(mockUpdatedPost);

      expect(result).toEqual(expectedResponse);
      expect(db.Posts.update).toHaveBeenCalledWith(
        {
          Posts_title: postUpdateRequestDTO.postTitle,
          Posts_content: postUpdateRequestDTO.postContent,
        },
        {where: {Posts_uid: postUpdateRequestDTO.postUid}},
      );
    });
    it('updatePost 동작 실패', async () => {
      const mockError = new Error('Database error');
      db.Posts.update.mockRejectedValue(mockError);

      try {
        await boardService.updatePost(
          new PostUpdateRequestDTO({
            postUid: 1,
            postTitle: 'Updated title',
            postContent: 'Updated content',
          }),
        );
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Database error');
      }
    });
  });

  describe('deletePost', () => {
    it('deletePost 동작 완료', async () => {
      const postDeleteRequestDTO = new PostDeleteRequestDTO({postUid: 1});
      db.Posts.destroy.mockResolvedValue(1);

      const result = await boardService.deletePost(postDeleteRequestDTO);
      expect(result).toEqual({message: '게시글 삭제 성공'});
      expect(db.Posts.destroy).toHaveBeenCalledWith({
        where: {Posts_uid: postDeleteRequestDTO.postUid},
      });
    });
    it('deletePost 동작 실패', async () => {
      const mockError = new Error('Database error');
      db.Posts.destroy.mockRejectedValue(mockError);

      try {
        await boardService.deletePost(new PostDeleteRequestDTO({postUid: 1}));
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Database error');
      }
    });
  });

  describe('incrementHit', () => {
    it('게시물 조회수 증가 성공', async () => {
      const mockPostUid = 1;

      db.Posts.findOne.mockResolvedValue({
        Posts_uid: mockPostUid,
        Posts_hit: 10,
      });
      db.Posts.increment.mockResolvedValue([1]);

      await boardService.incrementHit(mockPostUid);

      expect(db.Posts.increment).toHaveBeenCalledWith('Posts_hit', {
        where: {Posts_uid: mockPostUid},
      });
    });
  });
  describe('addLike', () => {
    it('좋아요 추가 성공', async () => {
      const mockPostUid = 1;
      const mockUserUid = 1;

      db.Likes.findOne.mockResolvedValue(null);
      db.Likes.create.mockResolvedValue(true);
      db.Posts.increment.mockResolvedValue(true);

      await boardService.addLike(mockPostUid, mockUserUid);

      expect(db.Likes.create).toHaveBeenCalledWith({
        Post_uid: mockPostUid,
        User_uid: mockUserUid,
      });
      expect(db.Posts.increment).toHaveBeenCalledWith('Posts_like', {
        where: {Posts_uid: mockPostUid},
      });
    });

    it('좋아요 중복 에러', async () => {
      const mockPostUid = 1;
      const mockUserUid = 1;

      db.Likes.findOne.mockResolvedValue(true);

      await expect(
        boardService.addLike(mockPostUid, mockUserUid),
      ).rejects.toThrow('이미 좋아요를 눌렀습니다.');
    });
  });

  it('좋아요 취소', async () => {
    const mockPostUid = 1;
    const mockUserUid = 1;

    db.Likes.destroy.mockResolvedValue(true);
    db.Posts.decrement.mockResolvedValue(true);

    await boardService.removeLike(mockPostUid, mockUserUid);

    expect(db.Likes.destroy).toHaveBeenCalledWith({
      where: {Post_uid: mockPostUid, User_uid: mockUserUid},
    });
    expect(db.Posts.decrement).toHaveBeenCalledWith('Posts_like', {
      where: {Posts_uid: mockPostUid},
    });
  });
});
