require('dotenv').config();

const BACKEND_SERVER_IP = process.env.BACKEND_SERVER_IP;
const BACKEND_SERVER_PORT = process.env.BACKEND_SERVER_PORT;
const PROTOCOL = process.env.PROTOCOL;

const backServer = {
  PROTOCOL,
  BACKEND_SERVER_IP,
  BACKEND_SERVER_PORT,
};

const FRONTEND_SERVER_IP = process.env.FRONTEND_SERVER_IP;
const FRONTEND_SERVER_PORT = process.env.FRONTEND_SERVER_PORT;

const frontServer = {
  PROTOCOL,
  FRONTEND_SERVER_IP,
  FRONTEND_SERVER_PORT,
};

class BoardController {
  constructor(boardService) {
    this.boardService = boardService;
  }

  getCreate(req, res) {
    res.render('board/create', {backServer});
  }

  async postCreate(req, res, next) {
    try {
      const postBody = req.body;
      const userNickname = req.user.Users_nickname;
      const responseData = await this.boardService.createPost(
        postBody,
        userNickname,
        req,
      );
      const postUid = responseData.data;
      res.redirect(`/posts/${postUid}`);
    } catch (e) {
      next(e);
    }
  }

  async getMainPage(req, res, next) {
    try {
      const error = req.error ? req.error : undefined;
      const user = req.user ? req.user : undefined;
      // const posts = await this.boardService.findAllPost();
      res.render('index', {
        // posts,
        user,
        error,
        backServer,
      });
    } catch (e) {
      next(e);
    }
  }

  async getOnePost(req, res, next) {
    if (!req.user || !req.user.Users_uid) {
      return res.redirect('/users/login');
    }

    const postUid = Number(req.params.postUid);
    try {
      const postData = await this.boardService.findOnePost(postUid, req);
      const adminRole = req.user.Role_authority;
      if (adminRole === 'admin') postData.isAuthor = true;
      res.render('board/view', {
        post: postData,
        user: req.user,
        backServer,
        like: 0,
        canEdit: postData.isAuthor,
      });
    } catch (e) {
      next(e);
    }
  }

  getModify(req, res) {
    const id = req.params.postUid;
    res.render('board/modify', {id, backServer});
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
    console.log(postUid);

    try {
      await this.boardService.likePost(postUid);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = BoardController;
