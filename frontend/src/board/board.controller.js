class BoardController {
  constructor(boardService) {
    this.boardService = boardService;
  }

  getCreate(req, res) {
    res.render('board/create');
  }

  async postCreate(req, res, next) {
    try {
      const postBody = req.body;
      const userNickname = req.user.Users_nickname;
      const responseData = await this.boardService.createPost(
        postBody,
        userNickname,
      );
      const postUid = responseData.data;
      console.log(postUid);
      res.redirect(`/posts/${postUid}`);
    } catch (e) {
      next(e);
    }
  }

  async getPosts(req, res, next) {
    try {
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
      console.log(postData);
      res.render('board/view', {post: postData});
    } catch (e) {
      next(e);
    }
  }

  getModify(req, res) {
    const id = req.params.postUid;
    res.render('board/modify', {id});
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
