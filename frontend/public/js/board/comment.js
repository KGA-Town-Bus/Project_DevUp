class Comment {
  page
  loadingState
  loadingEnd
  postUid
  commentWrapperElement
  commentBoxElement
  commentForm

  constructor(postUid) {
    this.page = 1;
    this.loadingState = false
    this.loadingEnd = false
    this.postUid = postUid
    this.commentWrapperElement = document.getElementById("comment-wrapper")
    this.commentBoxElement = document.getElementById("comment-box")
    this.commentForm = document.getElementById("form-comment")
    this.commentInputElement = document.getElementById("commentInput")
  }


  async commentsByPage(postUid, page) {
    const {data: {data: commentList}} = await axios.get(`${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/comments?post=${postUid}&page=${page}`)
    if (commentList.length === 0) {
      this.loadingEnd = true;
      return;
    }

    commentList.forEach((comment) => {
      const commentItemElement = document.createElement("div")
      commentItemElement.className = "comment-item"

      const dateTime = new Date(comment.commentCreatedAt)
      comment.commentCreatedAt = dateTime.toLocaleDateString() + "  " + dateTime.toLocaleTimeString()

      commentItemElement.innerHTML =
          `<div class="comment-item-header">
            <div><img class="content-user-pfp" src="${comment.commentUserProfile}"></div>
            <div class="comment-user-nickname">${comment.commentUserNickname} </div>
            <div class="comment-created-at">${comment.commentCreatedAt}</div>
            <button class="button-replies" data-commentId="${comment.commentUid}">Replies</button>
         </div>
         <div class="comment-item-content">${comment.commentContent} </div>`
      this.commentBoxElement.appendChild(commentItemElement)

      comment.replies.forEach((comment) => {
        const repliesItemElement = document.createElement("div")
        repliesItemElement.className = "replies-item"

        const dateTime = new Date(comment.commentCreatedAt)
        comment.commentCreatedAt = dateTime.toLocaleDateString() + "  " + dateTime.toLocaleTimeString()

        repliesItemElement.innerHTML =
            `<div class="comment-item-header">
            <div><img class="replies-arrow" src="/images/replies-arrow.png"></div>
            <div><img class="content-user-pfp" src="${comment.commentUserProfile}"></div>
            <div class="comment-user-nickname">${comment.commentUserNickname} </div>
            <div class="comment-created-at">${comment.commentCreatedAt}</div>
         </div>
         <div class="replies-item-content">${comment.commentContent} </div>`
        commentItemElement.insertAdjacentElement("afterend", repliesItemElement)
      })
    })
  }

  commentSubmitEvent(postUid) {
    this.commentForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      let comment
      let type
      let targetUid
      if(e.target[0].name === "comment") {
        comment = e.target.comment.value
        type = "comment"
      }else{
        comment = e.target.replies.value
        type = "replies"
        targetUid = e.target.targetUid.value
      }

      const {data: {data: newComment}} = await axios.post(`${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/comments`, {
        comment,
        type,
        postUid,
        targetUid
      }, {
        withCredentials: true
      })
      this.commentInputElement.value = ""
      this.commentBoxElement.innerHTML = ""

      console.log(postUid)
      console.log(this.page)
      await this.commentsByPage(postUid, 1)
    })
  }

  infiniteScroll = async () => {
    this.commentBoxElement.addEventListener('scroll', this.debounceScroll);
  }

  debounceScroll = _.debounce(async () => {

    const commentBoxElement = document.getElementById("comment-box")

    const nowHeight = commentBoxElement.scrollY || commentBoxElement.scrollTop;
    const targetHeight = commentBoxElement.scrollHeight / 6;

    if (
        nowHeight >= targetHeight &&
        this.loadingState === false &&
        this.loadingEnd === false
    ) {
      this.loadingState = true;
      this.loading.start();
      setTimeout(async () => {
        this.page++;
        await this.commentsByPage(postUid, this.page);
        this.loading.end();
        this.loadingState = false;
      }, 1000);
    }
  }, 400);

  loading = {
    start: () => {
      const spinnerWrapper = document.createElement('div');
      spinnerWrapper.id = 'spinner-wrapper';
      spinnerWrapper.style.display = 'flex';
      spinnerWrapper.style.alignItems = 'center';
      spinnerWrapper.style.marginTop = "-90px"

      const spinner = document.createElement('img');
      spinner.id = 'spinner';
      spinner.className = 'spinner';
      spinner.src = '/images/loading.png';
      spinnerWrapper.appendChild(spinner);

      this.commentBoxElement.appendChild(spinnerWrapper);
    },

    end: () => {
      const loading = document.querySelector('#spinner-wrapper');
      loading.remove();
    },
  };


  repliesButtonHandler = () => {
    this.commentBoxElement.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const commentUid = e.target.dataset.commentid
        this.commentForm.remove()

        const form = document.createElement("form")
        form.className = "form-comment"
        form.innerHTML =
            "<input name='replies' placeholder='Replies...' class='comment-input'>" +
            `<input type='hidden' name='targetUid' value="${commentUid}">`

        const button = document.createElement("button")
        button.className = "comment-submit"
        button.innerText = "Replies"
        form.appendChild(button)

        this.commentForm = form

        document.getElementById("post-footer").insertBefore(form, document.getElementById("post-footer").firstChild)
        this.commentSubmitEvent(this.postUid)
      }
    })
  }



}

const postUid = window.location.pathname.split("/posts/")[1]
const comment = new Comment(postUid)
comment.commentsByPage(postUid, 1)
comment.commentSubmitEvent(postUid)
comment.infiniteScroll()
comment.repliesButtonHandler()




















