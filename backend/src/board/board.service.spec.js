const {
  createPost,
  findAllPost,
  findOnePost,
  updatePost,
} = require("./board.service");
const db = require("../lib/db"); // DB 연결 파일 경로를 입력하세요.
const sequelize = db.sequelize;
const {
  PostsCreateRequestDTO,
  PostsCreateResponseDTO,
  PostsReadRequestDTO,
  PostsReadResponseDTO,
  PostsUpdateRequestDTO,
  PostsUpdateResponseDTO,
  PostsDeleteRequestDTO,
  CommentsCreateRequestDTO,
  CommentsCreateResponseDTO,
  CommentsReadResponseDTO,
  CommentsUpdateRequestDTO,
  CommentsDeleteRequestDTO,
  IncreamentHitRequestDTO,
  LikesRequestDTO,
  CommentsUpdateResponseDTO,
  CommentsDeleteResponseDTO,
  IncreamentHitResponseDTO,
  LikesResponseDTO,
} = require("./dto/board.dto"); // DTO 파일 경로를 입력하세요.

describe("board service", () => {
  beforeAll(async () => {
    await sequelize.authenticate();
  });
  afterAll(async () => {
    await sequelize.close();
  });
  describe("createPost", () => {
    it("게시글 생성 완료", async () => {
      const postCreateRequestDTO = new PostsCreateRequestDTO({
        Posts_title: "Test Title",
        Posts_content: "Test Content",
        Posts_writer: "Test Writer",
      });

      const result = await createPost(postCreateRequestDTO);

      expect(result).toBeInstanceOf(PostsCreateResponseDTO);
      expect(result.Posts_writer).toBe("Test Writer");
      expect(result.Posts_title).toBe("Test Title");
    });

    it("게시글 생성 실패", async () => {
      const invalidRequest = {
        Posts_writer: "Invalid writer",
        Posts_title: "Invalid Title",
        Posts_content: "Invalid Content",
      };

      await expect(createPost(invalidRequest)).rejects.toThrow(
        "db.create is not a function"
      );
    });
  });
  describe("readPost", () => {
    it("게시글 불러오기", async () => {
      const allPosts = await findAllPost();
      expect(allPosts).toBeInstanceOf(Array);
      expect(allPosts.length).toBeGreaterThan(0);
    });

    it("특정 게시글 보기 성공", async () => {
      const postFindOneRequestDTO = new PostsReadRequestDTO({
        Posts_uid: 1,
      });

      const result = await findOnePost(postFindOneRequestDTO);
      expect(result).toBeInstanceOf(PostsReadResponseDTO);
      expect(result.Posts_uid).toBe(1);
    });
    it("게시글 생성 실패", async () => {
      const invalidRequest = {
        Posts_uid: 1,
      };

      await expect(findOnePost(invalidRequest)).rejects.toThrow(
        "instance error"
      );
    });
  });
  describe("updatePost", () => {
    it("게시글 업데이트", async () => {
      const postUpdateRequestDTO = new PostsUpdateRequestDTO({
        Posts_uid: 1,
        Posts_title: "Test Title",
        Posts_content: "Test Content",
      });
      const result = await updatePost(postUpdateRequestDTO);
      expect(result).toBeInstanceOf(PostsUpdateResponseDTO);
      expect(result.Posts_title).toBe("Test Title");
      expect(result.Posts_content).toBe("Test Content");
    });
    it("게시글 업데이트 실패", async () => {
      const invalidRequest = {
        Posts_uid: 1,
        Posts_title: "Test Title",
        Posts_content: "Test Content",
      };

      await expect(updatePost(invalidRequest)).rejects.toThrow(
        "instance error"
      );
    });
  });
});
