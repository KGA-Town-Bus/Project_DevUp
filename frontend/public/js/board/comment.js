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

    const dateTime = new Date(newComment.commentCreatedAt)

    newComment.commentCreatedAt = dateTime.toLocaleDateString() + "  " + dateTime.toLocaleTimeString()
    div.innerHTML =
        `${newComment.commentUserNickname} 
        / ${newComment.commentContent} 
        / ${newComment.commentCreatedAt}`
    commentWrapper.appendChild(div)

  })
}

const loadComments = async () => {
  const postUid = window.location.pathname.split("/posts/")[1]

  const {data: {data: commentList}} = await axios.get(`http://localhost:4000/comments?post=${postUid}`)

  const commentWrapper = document.getElementById("comment-box")

  commentList.forEach((comment) => {
    const div = document.createElement("div")

    const dateTime = new Date(comment.commentCreatedAt)

    comment.commentCreatedAt = dateTime.toLocaleDateString() + "  " + dateTime.toLocaleTimeString()
    div.innerHTML =
        `${comment.commentUserNickname} 
        / ${comment.commentContent} 
        / ${comment.commentCreatedAt}`
    commentWrapper.appendChild(div)

  })

}




const initComment = async () => {
  commentEvent()
  await loadComments()

}
initComment()