const {Created} = require('../lib/customMessage');
const {
  PostCreateRequestDTO,
  PostReadRequestDTO,
  PostUpdateRequestDTO,
  PostDeleteRequestDTO,
} = require('./dto/board.dto');

class BoardController {
  constructor(boardService) {
    this.boardService = boardService;
  }
  async postCreate(req, res, next) {
    try {
      const createRequestDTO = new PostCreateRequestDTO(req.body);
      const responseData = await this.boardService.createPost(createRequestDTO);
      const data = responseData.postUid;
      res.status(201).json(new Created(data));
    } catch (e) {
      console.error('postCreate Error', e);
      next(e);
    }
  }

  async getAllPost(req, res, next) {
    try {
      const data = await this.boardService.findAllPost();

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
      console.log(req.body);
      const postUpdateRequestDTO = new PostUpdateRequestDTO({
        postUid: Number(req.params.postUid),
        ...req.body,
      });
      const data = await this.boardService.updatePost(postUpdateRequestDTO);
      console.log(data);

      res.json(data);
    } catch (e) {
      console.error('updatePost Error', e);
      next(e);
    }
  }

  async deletePost(req, res, next) {
    try {
      const postUid = Number(req.params.postUid);
      console.log(postUid);
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
      const postUid = Number(req.params.uid);
      const userUid = req.user.userUid;

      await this.boardService.addLike(postUid, userUid);

      res.status(201).json({message: '좋아요 추가'});
    } catch (e) {
      console.error('postLiked Error', e);
      next(e);
    }
  }

  async deleteLiked(req, res, next) {
    try {
      const postUid = Number(req.params.uid);
      const userUid = req.user.postUid;

      await this.boardService.removeLike(postUid, userUid);
      res.status(201).json({message: '좋아요 취소'});
    } catch (e) {
      console.error('deleteLiked Error', e);
      next(e);
    }
  }
}

module.exports = BoardController;
