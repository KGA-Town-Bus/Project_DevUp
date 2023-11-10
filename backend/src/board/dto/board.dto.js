const BaseDTO = require('../../lib/base.dto');
const {BadRequest} = require('../../lib/customException');

class PostCreateRequestDTO extends BaseDTO {
  postTitle;
  postContent;
  userNickname;

  constructor(body) {
    super();
    this.postTitle = body.postBody.postTitle;
    this.postContent = body.postBody.postContent;
    this.userNickname = body.userNickname;
    this.validate(this, BadRequest);
  }
}

class PostCreateResponseDTO extends BaseDTO {
  postUid;

  constructor(response) {
    super();
    this.postUid = response.Posts_uid;
    this.validate(this, BadRequest);
  }
}

class PostReadRequestDTO extends BaseDTO {
  postUid;

  constructor(body) {
    super();
    this.postUid = body.postUid;

    this.validate(this, BadRequest);
  }
}

class PostReadAllResponseDTO extends BaseDTO {
  postUid;
  postTitle;
  postContent;
  postWriter;
  postCreatedAt;
  postHit;
  userProfile;

  constructor(response) {
    super();
    this.postUid = response.Posts_uid;
    this.postTitle = response.Posts_title;
    this.postContent = response.Posts_content;
    this.postWriter = response.Posts_writer;
    this.postCreatedAt = this.toDate(response.Posts_created_at);
    this.postHit = response.Posts_hit;
    this.userProfile = response.Users_profile
  }
}

class PostReadResponseDTO extends BaseDTO {
  postUid;
  postTitle;
  postContent;
  postWriter;
  postCreatedAt;
  postHit;

  constructor(response) {
    super();
    this.postUid = response.Posts_uid;
    this.postTitle = response.Posts_title;
    this.postContent = response.Posts_content;
    this.postWriter = response.Posts_writer;
    this.postHit = response.Posts_hit;
    this.postCreatedAt = this.toDate(response.Posts_created_at);
    this.validate(this, BadRequest);
  }
}

class PostUpdateRequestDTO extends BaseDTO {
  postUid;
  postTitle;
  postContent;

  constructor(body) {
    super();
    this.postUid = body.postUid;
    this.postTitle = body.postTitle;
    this.postContent = body.postContent;
    this.validate(this, BadRequest);
  }
}

class PostUpdateResponseDTO extends BaseDTO {
  postUid;
  postTitle;
  postContent;
  postCreatedAt;
  message;

  constructor(response) {
    super();
    this.postUid = response.Posts_uid;
    this.postTitle = response.Posts_title;
    this.postContent = response.Posts_content;
    this.postCreatedAt = this.toDate(response.Posts_created_at);
    this.message = '게시물이 성공적으로 수정되었습니다.';
    this.validate(this, BadRequest);
  }
}

class PostDeleteRequestDTO extends BaseDTO {
  postUid;

  constructor(postUid) {
    super();
    this.postUid = postUid;
    this.validate(this, BadRequest);
  }
}

class CommentCreateRequestDTO extends BaseDTO {
  postUid;
  commentContent;
  commentWriter;

  constructor(body) {
    super();
    this.postUid = body.postUid;
    this.commentContent = body.commentContent;
    this.commentWriter = body.commentWriter;
    this.validate(this, BadRequest);
  }
}
class CommentCreateResponseDTO extends BaseDTO {
  commentUid;
  postUid;
  commentContent;
  commentWriter;
  commentCreatedAt;

  constructor(response) {
    super();
    this.commentUid = response.Comment_uid;
    this.postUid = response.Post_uid;
    this.commentContent = response.Comment_content;
    this.commentWriter = response.Comment_writer;
    this.commentCreatedAt = this.toDate(response.Comment_created_at);
    this.validate(this, BadRequest);
  }
}
class CommentReadResponseDTO extends BaseDTO {
  commentUid;
  postUid;
  commentContent;
  commentWriter;
  commentCreatedAt;

  constructor(response) {
    super();
    this.commentUid = response.Comment_uid;
    this.postUid = response.Post_uid;
    this.commentContent = response.Comment_content;
    this.commentWriter = response.Comment_writer;
    this.commentCreatedAt = this.toDate(response.Comment_created_at);
    this.validate(this, BadRequest);
  }
}

class CommentUpdateRequestDTO extends BaseDTO {
  commentUid;
  commentContent;

  constructor(body) {
    super();
    this.commentUid = body.commentUid;
    this.commentContent = body.commentContent;
    this.validate(this, BadRequest);
  }
}

class CommentUpdateResponseDTO extends BaseDTO {
  commentUid;
  commentContent;
  commentUpdatedAt;

  constructor(response) {
    super();
    this.commentUid = response.Comment_uid;
    this.commentContent = response.Comment_content;
    this.commentUpdatedAt = this.toDate(response.Comment_updated_at);
    this.validate(this, BadRequest);
  }
}

class CommentDeleteRequestDTO extends BaseDTO {
  commentUid;

  constructor(body) {
    super();
    this.commentUid = body.commentUid;
    this.validate(this, BadRequest);
  }
}

class CommentDeleteResponseDTO extends BaseDTO {
  commentUid;
  commentDeletedAt;

  constructor(response) {
    super();
    this.commentUid = response.commentUid;
    this.commentDeletedAt = this.toDate(response.commentDeletedAt);
    this.validate(this, BadRequest);
  }
}

class IncrementHitRequestDTO extends BaseDTO {
  postUid;

  constructor(body) {
    super();
    this.postUid = body.postUid;
    this.validate(this, BadRequest);
  }
}

class IncrementHitResponseDTO extends BaseDTO {
  postUid;
  postHit;

  constructor(response) {
    super();
    this.postUid = response.Post_uid;
    this.postHit = response.Post_hit;
    this.validate(this, BadRequest);
  }
}

class LikeRequestDTO extends BaseDTO {
  postUid;
  userId;

  constructor(body) {
    super();
    this.postUid = body.postUid;
    this.userId = body.userId;
    this.validate(this, BadRequest);
  }
}

class LikeResponseDTO extends BaseDTO {
  postUid;
  userId;
  likedAt;

  constructor(response) {
    super();
    this.postUid = response.Post_uid;
    this.userId = response.User_id;
    this.likedAt = this.toDate(response.Liked_at);
    this.validate(this, BadRequest);
  }
}

module.exports = {
  PostCreateRequestDTO,
  PostCreateResponseDTO,
  PostReadRequestDTO,
  PostReadAllResponseDTO,
  PostReadResponseDTO,
  PostUpdateRequestDTO,
  PostUpdateResponseDTO,
  PostDeleteRequestDTO,
  CommentCreateRequestDTO,
  CommentCreateResponseDTO,
  CommentReadResponseDTO,
  CommentUpdateRequestDTO,
  CommentUpdateResponseDTO,
  CommentDeleteRequestDTO,
  CommentDeleteResponseDTO,
  IncrementHitRequestDTO,
  IncrementHitResponseDTO,
  LikeRequestDTO,
  LikeResponseDTO,
};
