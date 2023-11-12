const {Created} = require('../lib/customMessage');
const {
  PostCreateRequestDTO,
  PostReadRequestDTO,
  PostUpdateRequestDTO,
  PostDeleteRequestDTO,
  LikeRequestDTO,
} = require('./dto/board.dto');

class BoardController {
  constructor(boardService) {
    this.boardService = boardService;
  }
  async postCreate(req, res, next) {
    try {
      const userUid = req.user.Users_uid
      const createRequestDTO = new PostCreateRequestDTO(req.body);
      const responseData = await this.boardService.createPost(createRequestDTO, userUid);
      const data = responseData.postUid;
      res.status(201).json(new Created(data));
    } catch (e) {
      console.error('postCreate Error', e);
      next(e);
    }
  }

  async getAllPost(req, res, next) {
    try {
      const {page, search} = req.query
      const data = await this.boardService.findAllPost(parseInt(page), search);

      res.status(201).json(data);
    } catch (e) {
      console.error('getAllPost Error', e);
      next(e);
    }
  }

  async getPost(req, res, next) {
    try {
      const postUid = Number(req.params.postUid);
      await this.boardService.incrementHit(postUid); // 조회수 증가 로직 호출
      const postReadRequestDTO = new PostReadRequestDTO({postUid});
      const data = await this.boardService.findOnePost(postReadRequestDTO);
      res.status(201).json(data);
    } catch (e) {
      console.error('postCreate Error', e);
      next(e);
    }
  }

  async putUpdatePost(req, res, next) {
    try {
      const postUpdateRequestDTO = new PostUpdateRequestDTO({
        postUid: Number(req.params.postUid),
        ...req.body,
      });
      const data = await this.boardService.updatePost(postUpdateRequestDTO);

      res.json(data);
    } catch (e) {
      console.error('updatePost Error', e);
      next(e);
    }
  }

  async deletePost(req, res, next) {
    try {
      const postUid = Number(req.params.postUid);
      const postDeleteRequestDTO = new PostDeleteRequestDTO(postUid);
      const result = await this.boardService.deletePost(postDeleteRequestDTO);
      res.status(201).json(result);
    } catch (e) {
      console.error('deletePost Error', e);
      next(e);
    }
  }

  async postLiked(req, res, next) {
    try {
      const postUid = Number(req.params.postUid);
      const userUid = Number(req.user.Users_uid);
      const postLikedRequestDTO = new LikeRequestDTO({
        postUid,
        Users_uid: userUid,
      });
      const addLike = await this.boardService.toggleLike(postLikedRequestDTO);
      const likedCount =
        await this.boardService.likedCount(postLikedRequestDTO);
      console.log({addLike, likedCount});
      res.status(200).json({addLike, likedCount});
    } catch (e) {
      console.error('postLiked Error', e);
      next(e);
    }
  }
}

module.exports = BoardController;
