const BaseDTO = require("./base.dto");

class PostsCreateRequestDTO extends BaseDTO {
  Posts_title;
  Posts_content;
  Posts_writer;

  constructor(body) {
    super();
    this.Posts_title = body.Posts_title;
    this.Posts_content = body.Posts_content;
    this.Posts_writer = body.Posts_writer;
    this.validate(this);
  }
}

class PostsCreateResponseDTO extends BaseDTO {
  Posts_uid;
  Posts_title;
  Posts_writer;
  Posts_created_at;

  constructor(response) {
    super();
    this.Posts_uid = response.Posts_uid;
    this.Posts_title = response.Posts_title;
    this.Posts_writer = response.Posts_writer;
    this.Posts_created_at = this.toDate(response.Posts_created_at);
    this.validate(this);
  }
}

class PostsReadRequestDTO extends BaseDTO {
  Posts_uid;

  constructor(body) {
    super();
    this.Posts_uid = body.Posts_uid;
    this.validate(this);
  }
}

class PostsReadResponseDTO extends BaseDTO {
  Posts_uid;
  Posts_title;
  Posts_content;
  Posts_writer;
  Posts_created_at;

  constructor(response) {
    super();
    this.Posts_uid = response.Posts_uid;
    this.Posts_title = response.Posts_title;
    this.Posts_content = response.Posts_content;
    this.Posts_writer = response.Posts_writer;
    this.Posts_created_at = this.toDate(response.Posts_created_at);
    this.validate(this);
  }
}

class PostsUpdateRequestDTO extends BaseDTO {
  Posts_uid;
  Posts_title;
  Posts_content;

  constructor(body) {
    super();
    this.Posts_uid = body.Posts_uid;
    this.Posts_title = body.Posts_title;
    this.Posts_content = body.Posts_content;
    this.validate(this);
  }
}

class PostsUpdateResponseDTO extends BaseDTO {
  Posts_uid;
  Posts_title;
  Posts_content;
  Posts_created_at;

  constructor(response) {
    super();
    this.Posts_uid = response.Posts_uid;
    this.Posts_title = response.Posts_title;
    this.Posts_content = response.Posts_content;
    this.Posts_created_at = this.toDate(response.Posts_created_at);
    this.validate(this);
  }
}

class PostsDeleteRequestDTO extends BaseDTO {
  Posts_uid;

  constructor(body) {
    super();
    this.Posts_uid = body.Posts_uid;
    this.validate(this);
  }
}

class CommentsCreateRequestDTO extends BaseDTO {
  Posts_uid;
  comment_content;
  comment_writer;

  constructor(body) {
    super();
    this.Posts_uid = body.Posts_uid;
    this.comment_content = body.comment_content;
    this.comment_writer = body.comment_writer;
    this.validate(this);
  }
}

class CommentsCreateResponseDTO extends BaseDTO {
  comment_id;
  Posts_uid;
  comment_content;
  comment_writer;
  comment_created_at;

  constructor(response) {
    super();
    this.comment_id = response.comment_id;
    this.Posts_uid = response.Posts_uid;
    this.comment_content = response.comment_content;
    this.comment_writer = response.comment_writer;
    this.comment_created_at = this.toDate(response.comment_created_at);
    this.validate(this);
  }
}

class CommentsReadResponseDTO extends BaseDTO {
  comment_id;
  Posts_uid;
  comment_content;
  comment_writer;
  comment_created_at;

  constructor(response) {
    super();
    this.comment_id = response.comment_id;
    this.Posts_uid = response.Posts_uid;
    this.comment_content = response.comment_content;
    this.comment_writer = response.comment_writer;
    this.comment_created_at = this.toDate(response.comment_created_at);
    this.validate(this);
  }
}

class CommentsUpdateRequestDTO extends BaseDTO {
  comment_id;
  comment_content;

  constructor(body) {
    super();
    this.comment_id = body.comment_id;
    this.comment_content = body.comment_content;
    this.validate(this);
  }
}

class CommentsUpdateResponseDTO extends BaseDTO {
  comment_id;
  comment_content;
  comment_updated_at;

  constructor(response) {
    super();
    this.comment_id = response.comment_id;
    this.comment_content = response.comment_content;
    this.comment_updated_at = this.toDate(response.comment_updated_at);
    this.validate(this);
  }
}

class CommentsDeleteRequestDTO extends BaseDTO {
  comment_id;

  constructor(body) {
    super();
    this.comment_id = body.comment_id;
    this.validate(this);
  }
}

class CommentsDeleteResponseDTO extends BaseDTO {
  comment_id;
  comment_deleted_at;

  constructor(response) {
    super();
    this.comment_id = response.comment_id;
    this.comment_deleted_at = this.toDate(response.comment_deleted_at);
    this.validate(this);
  }
}

class IncreamentHitRequestDTO extends BaseDTO {
  Posts_uid;

  constructor(body) {
    super();
    this.Posts_uid = body.Posts_uid;
    this.validate(this);
  }
}

class IncreamentHitResponseDTO extends BaseDTO {
  Posts_uid;
  hit;

  constructor(response) {
    super();
    this.Posts_uid = response.Posts_uid;
    this.hit = response.hit;
    this.validate(this);
  }
}

class LikesRequestDTO extends BaseDTO {
  Posts_uid;
  user_id;

  constructor(body) {
    super();
    this.Posts_uid = body.Posts_uid;
    this.user_id = body.user_id;
    this.validate(this);
  }
}

class LikesResponseDTO extends BaseDTO {
  Posts_uid;
  user_id;
  liked_at;

  constructor(response) {
    super();
    this.Posts_uid = response.Posts_uid;
    this.user_id = response.user_id;
    this.liked_at = this.toDate(response.liked_at);
    this.validate(this);
  }
}

module.exports = {
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
  CommentsUpdateResponseDTO,
  CommentsDeleteRequestDTO,
  CommentsDeleteResponseDTO,
  IncreamentHitRequestDTO,
  IncreamentHitResponseDTO,
  LikesRequestDTO,
  LikesResponseDTO,
};
