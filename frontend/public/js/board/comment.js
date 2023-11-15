const commentEvent = () => {
  document.getElementById("form-comment").addEventListener("submit", async (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    const postUid = window.location.pathname.split("/posts/")[1]


    const {data: {data:newComment}} = await axios.post("http://localhost:4000/comments", {
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

  })
}

const loadComments = async () => {
  const postUid = window.location.pathname.split("/posts/")[1]

  const {data: {data: commentList}} = await axios.get(`http://localhost:4000/comments?post=${postUid}`)

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




const initComment = async () => {
  commentEvent()
  await loadComments()

}
initComment()