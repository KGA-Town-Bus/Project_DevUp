let page = 1;
let loadingState = false;
let loadingEnd = false;
let searchString = '';
const contents = document.getElementById('contents');

const infiniteScroll = async () => {
  document.addEventListener('scroll', debounceScroll);
  await postByPage(page);
};

const debounceScroll = _.debounce(async function () {
  const nowHeight = window.scrollY || document.documentElement.scrollTop;
  const targetHeight = document.documentElement.offsetHeight / 1.6;

  if (
    nowHeight >= targetHeight &&
    loadingState === false &&
    loadingEnd === false
  ) {
    loadingState = true;
    loading.start();
    setTimeout(async () => {
      page++;
      if (searchString === '') await postByPage(page);
      else await postByPage(page, searchString);
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

const debounceInput = _.debounce(async function (e) {
  contents.innerHTML = '';
  loadingEnd = false;
  page = 1;
  searchString = e.target.value;
  await postByPage(page, searchString);
}, 300);
document.getElementById('search').addEventListener('input', debounceInput);

const postByPage = async (page, searchString) => {
  let postList;
  if (searchString === '' || searchString === undefined) {
    const {data} = await axios.get(
      `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/?page=${page}`,
    );
    postList = data;
  } else {
    const {data} = await axios.get(
      `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/?page=${page}&search=${searchString}`,
    );
    postList = data;
  }

  if (postList.length === 0) {
    loadingEnd = true;
    return;
  }

  postList.forEach(post => {
    const hasImage = post.postContent.includes('<img');
    const imageIcon = hasImage ? '<span class="fas fa-image" style="display: inline"></span> ' : '';
    const template = `<section class="post-container" data-post-id="${post.postUid}">
      <div class="content-header">
        <span class="content-title" id="postTitle">
            ${imageIcon}
            ${post.postTitle}</span>
        <div class="content-user">
          <img class="content-user-pfp" id="userProfile" src='${post.userProfile}'>
          <span class="content-username" id="postWriter">${post.postWriter}</span>
        </div>
      </div>
      <div class="content-body">
        <span class="body-text" id="postContent">${post.postContent}</span>
      </div>
      <div class="content-footer">
        <div class="content-date">${post.postCreatedAt}</div>
        <div class="icon-set">
          <img src="images/Hit Icon.svg" alt=""/>
          <span id="postHit">${post.postHit}</span>
          <img src="images/Like Icon.svg" alt=""/>
          <span id="postLike">${post.postLike}</span>
          <img src="images/Comment Icon.svg" alt=""/>
          <span>${post.comment}</span>
        </div>
      </div>
    </section>`;

    contents.innerHTML = contents.innerHTML + template;
  });

  Prism.highlightAll();

  addClickListenerToPosts();
};

const addClickListenerToPosts = () => {
  const posts = document.querySelectorAll('.post-container');
  posts.forEach(post => {
    post.addEventListener('mouseover', () => {
      post.style.cursor = 'pointer';
    });

    post.addEventListener('click', e => {
      if (
        e.target.closest('.content-footer') ||
        e.target.closest('.content-user')
      ) {
        return;
      }

      const postUid = post.getAttribute('data-post-id');
      window.location.href = `/posts/${postUid}`;
    });
  });
};

const init = async () => {
  await infiniteScroll();
  addClickListenerToPosts();
};

init();
