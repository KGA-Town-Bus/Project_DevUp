const {
  PostCreateRequestDTO,
  PostReadRequestDTO,
  PostUpdateRequestDTO,
  PostDeleteRequestDTO,
  CommentCreateRequestDTO,
  CommentUpdateRequestDTO,
  CommentDeleteRequestDTO,
  IncrementHitRequestDTO,
  LikeRequestDTO,
} = require("./dto/board.dto");

class BoardController {
  constructor(boardService) {
    this.boardService = boardService;
  }
  async postCreate(req, res, next) {
    try {
      const createRequestDTO = new PostCreateRequestDTO(req.body);
      const data = await this.boardService.createPost(createRequestDTO);

      res.status(201).json(data);
    } catch (e) {
      console.error("postCreate Error", e);
      next(e);
    }
  }

  async getAllPost(req, res, next) {
    console.log("getAllPost function start"); // 시작 부분에 로깅 추가
    try {
      const getAllRequestDTO = new PostReadRequestDTO(req.body);
      const data = await this.boardService.findAllPost(getAllRequestDTO); // 여기를 수정
      res.status(201).json(data);
    } catch (e) {
      console.error("getAllPost Error", e);
      next(e);
    }
  }

  async getPost(req, res, next) {
    try {
      const postUid = req.params.uid;
      const postReadRequestDTO = new PostReadRequestDTO({ postUid });
      const data = await this.boardService.findOnePost(postReadRequestDTO);
      res.status(201).json(data);
    } catch (e) {
      console.error("postCreate Error", e);
      next(e);
    }
  }

  async updatePost(req, res, next) {
    try {
      const postUpdateRequestDTO = new PostUpdateRequestDTO({
        postUid: req.params.uid,
        ...req.body,
      });
      console.log(postUpdateRequestDTO);
      const data = await this.boardService.updatePost(postUpdateRequestDTO); // 'this.boardService'로 변경했습니다.
      res.status(201).json(data);
    } catch (e) {
      console.error("updatePost Error", e);
      next(e);
    }
  }

  async deletePost(req, res, next) {
    try {
      const postDeleteRequestDTO = new PostDeleteRequestDTO({
        postUid: req.params.uid,
      });
      const result = await this.boardService.deletePost(postDeleteRequestDTO);
      res.status(201).json(result);
    } catch (e) {
      console.error("deletePost Error", e);
      next(e);
    }
  }

  async postLiked(req, res, next) {
    try {
    } catch (e) {
      console.error("postLiked Error", e);
      next(e);
    }
  }
}

module.exports = BoardController;
