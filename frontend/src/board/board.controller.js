class BoardController {
  constructor(boardService) {
    this.boardService = boardService;
  }

  getCreate(req, res) {
    res.render('board/create');
  }

  async postCreate(req, res, next) {
    try {
      const postUid = await this.boardService.createPost(req.body);
      res.redirect(`/posts/${postUid}`);
    } catch (e) {
      next(e);
    }
  }

  async getPosts(req, res, next) {
    try {
      const user = req.user ? req.user : undefined
      const posts = await this.boardService.findAllPost();
      res.render('index', {
        posts,
        user
      });
    } catch (e) {
      next(e);
    }
  }

  async getOnePost(req, res, next) {
    const postUid = Number(req.params.postUid);
    try {
      const postData = await this.boardService.findOnePost(postUid);
      // await this.boardService.incrementViews(postUid);

      res.render('board/view', {post: postData});
    } catch (e) {
      next(e);
    }
  }

  getModify(req, res) {
    res.render('board/modify');
  }

  async putUpdate(req, res, next) {
    const postUid = req.params.postUid;
    const updateData = req.body;

    try {
      await this.boardService.updatePost(postUid, updateData);
      res.redirect(`/posts/${postUid}`);
    } catch (e) {
      next(e);
    }
  }

  async postDelete(req, res, next) {
    const postUid = req.params.postUid;

    try {
      await this.boardService.deletePost(postUid);
      res.redirect('/');
    } catch (e) {
      next(e);
    }
  }

  async postLike(req, res, next) {
    const postUid = req.params.postUid;

    try {
      await this.boardService.likePost(postUid);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = BoardController;
