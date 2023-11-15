const commentEvent = () => {
  document.getElementById("form-comment").addEventListener("submit", async (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    const postUid = window.location.pathname.split("/posts/")[1]

    const {data: {data:newComment}} = await axios.post(`${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/comments`, {
      comment,
      postUid
    }, {
      withCredentials: true
    })

    const commentWrapper = document.getElementById("comment-box")
    const div = document.createElement("div")
    div.className = "comment-item"


    const dateTime = new Date(newComment.commentCreatedAt)

    newComment.commentCreatedAt = dateTime.toLocaleDateString() + "  " + dateTime.toLocaleTimeString()

    div.innerHTML =
        `<div class="comment-item-header">
            <div><img class="content-user-pfp" src="${newComment.commentUserProfile}"></div>
            <div>${newComment.commentUserNickname} </div>
            <div class="comment-created-at">${newComment.commentCreatedAt}</div>
            <button class="button-replies">Replies</button>
         </div>
         <div class="comment-item-content">${newComment.commentContent} </div>`


    commentWrapper.insertBefore(div,commentWrapper.firstChild)


    document.getElementById("commentInput").value = ""

  })
}

const loadComments = async () => {
  const postUid = window.location.pathname.split("/posts/")[1]

  const {data: {data: commentList}} = await axios.get(`${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/comments?post=${postUid}&page=1`)

  const commentWrapper = document.getElementById("comment-box")

  commentList.forEach((comment) => {
    const div = document.createElement("div")
    div.className = "comment-item"

    const dateTime = new Date(comment.commentCreatedAt)

    comment.commentCreatedAt = dateTime.toLocaleDateString() + "  " + dateTime.toLocaleTimeString()

    div.innerHTML =
        `<div class="comment-item-header">
            <div><img class="content-user-pfp" src="${comment.commentUserProfile}"></div>
            <div>${comment.commentUserNickname} </div>
            <div class="comment-created-at">${comment.commentCreatedAt}</div>
            <button class="button-replies">Replies</button>
         </div>
         <div class="comment-item-content">${comment.commentContent} </div>`
    commentWrapper.appendChild(div)
  })

}


let page = 1;
let loadingState = false;
let loadingEnd = false;
const postUid = window.location.pathname.split("/posts/")[1]

const debounceScroll = _.debounce(async function () {
  const commentBox = document.getElementById("comment-box")

  const nowHeight = commentBox.scrollY || commentBox.scrollTop;
  const targetHeight = commentBox.offsetHeight / 1.6;

  if (
      nowHeight >= targetHeight &&
      loadingState === false &&
      loadingEnd === false
  ) {
    loadingState = true;
    loading.start();
    setTimeout(async () => {
      page++;
      await commentByPage(postUid, page);
      loading.end();
      loadingState = false;
    }, 1000);
  }
}, 400);



const loading = {
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

    contents.appendChild(spinnerWrapper);

  },

  end: () => {

    const loading = document.querySelector('#spinner-wrapper');
    loading.remove();
  },
};


const commentByPage = async (postUid, page) => {
  const {data: {data:commentList}} = await axios.get(`${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/comments?post=${postUid}&page=${page}`)

  if (commentList.length === 0) {
    loadingEnd = true;
    return;
  }

  const commentWrapper = document.getElementById("comment-box")

  commentList.forEach((comment) => {
    const div = document.createElement("div")
    div.className = "comment-item"

    const dateTime = new Date(comment.commentCreatedAt)

    comment.commentCreatedAt = dateTime.toLocaleDateString() + "  " + dateTime.toLocaleTimeString()

    div.innerHTML =
        `<div class="comment-item-header">
            <div><img class="content-user-pfp" src="${comment.commentUserProfile}"></div>
            <div>${comment.commentUserNickname} </div>
            <div class="comment-created-at">${comment.commentCreatedAt}</div>
            <button class="button-replies">Replies</button>
         </div>
         <div class="comment-item-content">${comment.commentContent} </div>`
    commentWrapper.appendChild(div)
  })

};



const infiniteScroll = async() => {
  const commentBox = document.getElementById("comment-box")
  commentBox.addEventListener('scroll', debounceScroll);
}




const initComment = async () => {
  commentEvent()
  await loadComments()
  infiniteScroll()

}
initComment()