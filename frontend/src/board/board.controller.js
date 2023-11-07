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
    try {
      postUid = req.params.id;
      const data = await this.boardService.findOnePost(postUid);
      res.redirect(`/`);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = BoardController;
