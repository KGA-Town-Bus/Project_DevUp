const db = require("../lib/db");
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
} = require("./dto/board.dto");

exports.createPost = async (postCreateRequestDTO) => {
  try {
    if (!(postCreateRequestDTO instanceof PostsCreateRequestDTO)) {
      throw new Error("db.create is not a function");
    }

    const { Posts_title, Posts_content, Posts_writer } = postCreateRequestDTO;
    const response = await db.Posts.create({
      Posts_title,
      Posts_content,
      Posts_writer,
    });
    const result = new PostsCreateResponseDTO(response);
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.findAllPost = async () => {
  try {
    const posts = await db.Posts.findAll();
    return posts;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.findOnePost = async (postFindOneRequestDTO) => {
  try {
    if (!(postFindOneRequestDTO instanceof PostsReadRequestDTO)) {
      throw new Error("findeOne instance error");
    }
    const { Posts_uid } = postFindOneRequestDTO;
    const response = await db.Posts.findOne({
      where: {
        Posts_uid,
      },
    });
    const result = new PostsReadResponseDTO(response);
    console.log(result);
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.updatePost = async (postUpdateRequestDTO) => {
  try {
    if (!(postUpdateRequestDTO instanceof PostsUpdateRequestDTO)) {
      throw new Error("update instance error");
    }
    const { Posts_uid, Posts_title, Posts_content } = postUpdateRequestDTO;
    const response = await db.Posts.update(
      { Posts_title, Posts_content },
      { where: { Posts_uid } }
    );
    const updatedPost = await db.Posts.findOne({ where: { Posts_uid } });
    const result = new PostsUpdateResponseDTO(updatedPost);
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.deletePost = async (postsDeleteRequestDTO) => {
  try {
    if (!(postsDeleteRequestDTO instanceof PostsDeleteRequestDTO)) {
      throw new Error("delete instance error");
    }
    const { Posts_uid } = postsDeleteRequestDTO;
  } catch (e) {
    throw new Error(e.message);
  }
};
