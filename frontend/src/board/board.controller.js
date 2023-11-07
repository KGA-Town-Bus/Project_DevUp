class BoardController {
  constructor(boardService) {
    this.boardService = boardService;
  }

  async postCreate(req, res, next) {
    try {
      const postUid = await this.boardService.createPost(req.body);
      res.redirect(`/${postUid}`);
    } catch (e) {
      next(e);
    }
  }

  async getPosts(req, res, next) {
    try {
      await this.boardService.findAllPost();
      res.redirect('/');
    } catch (e) {
      next(e);
    }
  }

  async getOnePost(req, res, next) {
    const postUid = req.params.uid;
    try {
      const postData = await this.boardService.findOnePost(postUid);
      await this.boardService.incrementViews(postUid);
      res.json(postData);
    } catch (e) {
      next(e);
    }
  }

  async postUpdate(req, res, next) {
    const postId = req.params.postId;
    const updateData = req.body;

    try {
      await this.boardService.updatePost(postId, updateData);
      res.redirect(`/posts/${postId}`);
    } catch (e) {
      next(e);
    }
  }

  async postDelete(req, res, next) {
    const postId = req.params.postId;

    try {
      await this.boardService.deletePost(postId);
      res.redirect('/');
    } catch (e) {
      next(e);
    }
  }

  async postLike(req, res, next) {
    const postId = req.params.postId;

    try {
      await this.boardService.likePost(postId);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = BoardController;
