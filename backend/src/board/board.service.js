const db = require('../lib/db');
const {
  PostCreateRequestDTO,
  PostCreateResponseDTO,
  PostReadRequestDTO,
  PostReadAllResponseDTO,
  PostReadResponseDTO,
  PostUpdateRequestDTO,
  PostUpdateResponseDTO,
  PostDeleteRequestDTO,
} = require('./dto/board.dto');
let instance = null;
const {Op} = require('sequelize');

class BoardService {
  static getInstance() {
    if (!instance) {
      instance = new BoardService();
    }
    return instance;
  }
  async createPost(createRequestDTO) {
    try {
      if (!(createRequestDTO instanceof PostCreateRequestDTO)) {
        throw new Error('Invalid request DTO');
      }
      const {postTitle, postContent, userUid, userNickName} = createRequestDTO;
      const createdValues = await db.Posts.create({
        Posts_title: postTitle,
        Posts_content: postContent,
        Posts_writer: userNickName,
        Users_uid: userUid,
      });
      console.log(createdValues);
      const createdPost = createdValues.dataValues;
      return new PostCreateResponseDTO(createdPost);
    } catch (e) {
      console.error('Service createPost Error', e);
      throw new Error(e.message);
    }
  }

  async findAllPost(page, search) {
    try {
      const pageSize = 10;
      const offset = (page - 1) * pageSize;

      const posts = await db.Posts.findAll({
        include: [{model: db.Users}, {model: db.Likes}],
        offset: offset,
        limit: pageSize,
        where: {
          [Op.or]: [
            {Posts_title: {[Op.like]: search ? `%${search}%` : '%'}},
            {Posts_content: {[Op.like]: search ? `%${search}%` : '%'}},
          ],
        },
        order: [['Posts_created_at', 'DESC']],
      });

      return posts.map(post => {
        const data = {
          Posts_uid: post.dataValues.Posts_uid,
          Posts_title: post.dataValues.Posts_title,
          Posts_content: post.dataValues.Posts_content,
          Posts_writer: post.dataValues.Posts_writer,
          Posts_created_at: post.dataValues.Posts_created_at,
          Posts_hit: post.dataValues.Posts_hit,
          Users_profile: post.dataValues.User.dataValues.Users_profile,
          Posts_like: post.dataValues.Posts_like,
        };

        return new PostReadAllResponseDTO(data);
      });
    } catch (e) {
      console.error('Service findAllPost Error', e);
      throw new Error(e.message);
    }
  }

  async findOnePost(postReadRequestDTO, userUid) {
    try {
      if (!(postReadRequestDTO instanceof PostReadRequestDTO)) {
        throw new Error('Invalid request DTO');
      }
      const {postUid} = postReadRequestDTO;
      const responseData = await db.Posts.findOne({
        where: {Posts_uid: postUid},
        include: {
          model: db.Users,
        },
      });

      const post = responseData.dataValues;
      if (!post) {
        throw new Error('게시물을 찾을 수 없습니다.');
      }

      return new PostReadResponseDTO(post, userUid);
    } catch (e) {
      console.error('Service findOnePost Error', e);
      throw new Error(e.message);
    }
  }

  async updatePost(postUpdateRequestDTO) {
    try {
      if (!(postUpdateRequestDTO instanceof PostUpdateRequestDTO)) {
        throw new Error('Invalid request DTO');
      }
      const {postUid, postTitle, postContent} = postUpdateRequestDTO;
      await db.Posts.update(
        {Posts_title: postTitle, Posts_content: postContent},
        {where: {Posts_uid: postUid}},
      );
      // const updatedPost = await db.Posts.findOne({
      //   where: {Posts_uid: postUid},
      // });
      // return new PostUpdateResponseDTO(updatedPost);
      return {message: '업데이트 성공'};
    } catch (e) {
      console.error('Service updatePost Error', e);
      throw new Error(e.message);
    }
  }

  async deletePost(postDeleteRequestDTO) {
    try {
      if (!(postDeleteRequestDTO instanceof PostDeleteRequestDTO)) {
        throw new Error('Invalid request DTO');
      }
      const {postUid} = postDeleteRequestDTO;
      const deletedRowCount = await db.Posts.destroy({
        where: {Posts_uid: postUid},
      });
      if (deletedRowCount === 0) {
        throw new Error('게시물을 찾을 수 없습니다.');
      }
      return {message: '게시글 삭제 성공'};
    } catch (e) {
      console.error('Service deletePost Error', e);
      throw new Error(e.message);
    }
  }
  async incrementHit(postUid) {
    try {
      await db.Posts.increment('Posts_hit', {
        where: {Posts_uid: postUid},
      });
    } catch (e) {
      console.error('Service incrementHit Error', e);
      throw new Error(e.message);
    }
  }

  async toggleLike(postLikedRequestDTO) {
    try {
      const {postUid, userUid} = postLikedRequestDTO;
      const existingLike = await db.Likes.findOne({
        where: {Posts_uid: postUid, Users_uid: userUid},
      });

      if (existingLike) {
        await db.Likes.destroy({
          where: {Posts_uid: postUid, Users_uid: userUid},
        });

        await db.Posts.decrement('Posts_like', {
          where: {Posts_uid: postUid},
        });

        return '좋아요 취소';
      } else {
        await db.Likes.create({
          Posts_uid: postUid,
          Users_uid: userUid,
        });

        await db.Posts.increment('Posts_like', {
          where: {Posts_uid: postUid},
        });

        return '좋아요 추가';
      }
    } catch (e) {
      console.error('Service toggleLike Error', e);
      throw new Error(e.message);
    }
  }

  async likedCount(postLikedRequestDTO) {
    try {
      const {postUid} = postLikedRequestDTO;
      const likedCount = await db.Likes.count({
        where: {Posts_uid: postUid},
      });
      return likedCount;
    } catch (e) {
      console.error('Service likedCount Error', e);
      throw new Error(e.message);
    }
  }

  async addComment() {
    try {
    } catch (e) {
      console.error('Service removeLike Error', e);
      throw new Error(e.message);
    }
  }
}

module.exports = BoardService;
