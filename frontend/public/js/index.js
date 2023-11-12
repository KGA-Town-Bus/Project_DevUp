let page = 1
let loadingState = false
let loadingEnd = false;

const infiniteScroll = async () => {
  document.addEventListener("scroll", debounceScroll)
  await postByPage(page)
}

const debounceScroll = _.debounce(async function () {
  const nowHeight = window.scrollY || document.documentElement.scrollTop;
  const targetHeight = document.documentElement.offsetHeight / 1.6

  if (nowHeight >= targetHeight && loadingState === false && loadingEnd === false) {

    loadingState = true
    loading.start()
    setTimeout(async() => {
      page++;
      await postByPage(page)
      loading.end()
      loadingState = false
    },1000)
  }
}, 400);

const loading = {
  start: () => {
    const spinnerWrapper = document.createElement("div")
    spinnerWrapper.id = "spinner-wrapper"
    spinnerWrapper.style.display = "flex"
    spinnerWrapper.style.alignItems = "center"

    const spinner = document.createElement("img")
    spinner.id = "spinner"
    spinner.className = "spinner"
    spinner.src = "/images/loading.png"
    spinnerWrapper.appendChild(spinner)

    const contents = document.getElementById("contents")
    contents.appendChild(spinnerWrapper)
  },

  end: () => {
    const loading = document.querySelector("#spinner-wrapper")
    loading.remove()
  }
}


const postByPage = async (page) => {
  const contents = document.getElementById("contents")

  const {data: postList} = await axios.get(`${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/?page=${page}`)

  if (postList.length === 0) {
    loadingEnd = true;
    return
  }

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



