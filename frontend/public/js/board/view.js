const postButton = document.querySelector('.post');
const postModal = document.querySelector('.modal');

postButton.addEventListener('click', function (e) {
  e.preventDefault();
  if (postModal.style.display === 'none' || postModal.style.display === '') {
    postModal.style.display = 'flex';
  } else {
    postModal.style.display = 'none';
  }
});

// post modal close
const closeButton = document.querySelector('.close-button');

closeButton.addEventListener('click', function () {
  postModal.style.display = 'none';
});

// publish button activation -> handed to CHAMDOM
const publishButton = document.querySelector('.publish-button');

publishButton.addEventListener('click', async function () {
  const postTitle = document.querySelector('.postTitle').value;
  const postContent = editorInstance.getData().replace(/<[^>]*>/g, '');
  const url = window.location.pathname;
  const postUid = url.substring(url.lastIndexOf('/') + 1);

  const axiosPath = `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/posts/${postUid}`;
  const axiosBody = {
    postTitle,
    postContent,
  };

  const axiosOptions = {
    withCredentials: true,
  };

  const response = await axios.put(axiosPath, axiosBody, axiosOptions);

  postModal.style.display = 'none';

  location.href = `/posts/${postUid}`;
});

const deleteButton = document.querySelector('.delete-button');

deleteButton.addEventListener('click', async function () {
  const url = window.location.pathname;
  const postUid = url.substring(url.lastIndexOf('/') + 1);

  const axiosPath = `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/posts/${postUid}`;

  const axiosOptions = {
    withCredentials: true,
  };

  const response = await axios.delete(axiosPath, axiosOptions);

  postModal.style.display = 'none';

  location.href = `/`;
});

document.querySelector('#like').addEventListener('submit', async e => {
  e.preventDefault();

  const url = window.location.pathname;
  const postUid = url.substring(url.lastIndexOf('/') + 1);

  const response = await axios.post(
    `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/posts/${postUid}/like`,
    {},
    {
      withCredentials: true,
    },
  );
  const likeCountElement = document.getElementById('likeCount');
  likeCountElement.textContent = response.data.likedCount;
});
