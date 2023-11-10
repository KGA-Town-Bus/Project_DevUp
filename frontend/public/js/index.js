let page = 1

const infiniteScroll = async () => {
  document.addEventListener("scroll", debounceScroll)
  await postByPage(page)
}

const debounceScroll = _.debounce(function () {
  const nowHeight = window.scrollY || document.documentElement.scrollTop;

  const loadingTargetHeight = (document.documentElement.offsetHeight / 1.5) - 300
  const targetHeight = document.documentElement.offsetHeight / 1.5

  if (nowHeight >= loadingTargetHeight) loading.start()


  if (nowHeight >= targetHeight) {
    setTimeout(() => {
      page++;
      postByPage(page)
      loading.end()
    },1000)
  }
}, 400);

const loading = {
  start: () => {
    const loading = `<div id="spinner-wrapper" style="display: flex; align-items: center" >
  <img id="spinner" class="spinner" src="/images/loading.png">
</div>`
    const contents = document.getElementById("contents")
    contents.innerHTML = contents.innerHTML + loading
  },

  end: () => {
    const loading = document.querySelector("#spinner-wrapper")
    loading.remove()
  }
}


const postByPage = async (page) => {

  const {data: postList} = await axios.get(`${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/?page=${page}`)

  const contents = document.getElementById("contents")
  postList.forEach((post) => {
    const template = `<section>
      <div class="content-header">
        <span class="content-title" id="postTitle">${post.postTitle}</span>
        <div class="content-user">
          <img class="content-user-pfp" id="userProfile" src=${post.userProfile}>
          <span class="content-username" id="postWriter">${post.postWriter}</span>
        </div>
      </div>
      <div class="content-body">
        <span class="body-text" id="postContent">${post.postContent}</span>
      </div>
      <div class="content-footer">
        <div class="content-date">2023-11-08</div>
        <div class="icon-set">
          <img src="images/Hit Icon.svg" alt=""/>
          <span id="postHit">${post.postHit}</span>
          <img src="images/Like Icon.svg" alt=""/>
          <span id="postLike">${post.postLike}</span>
          <img src="images/Comment Icon.svg" alt=""/>
          <span>50</span>
        </div>
      </div>
    </section>`

    contents.innerHTML = contents.innerHTML + template
  })
}


infiniteScroll()


const errorCheck = () => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const error = params.get('error');
  if (error) {
    alert(error);
    location.href = '/';

  }
}
errorCheck()


const chatButton = document.querySelector('.chat'); // The button to open chat
const chatRoom = document.getElementById('chatroom'); // The chat room box

chatButton.addEventListener('click', function () {
  // Toggle the display of the chatroom
  if (chatRoom.style.display === 'none' || chatRoom.style.display === '') {
    chatRoom.style.display = 'flex';
  } else {
    chatRoom.style.display = 'none';
  }
});



