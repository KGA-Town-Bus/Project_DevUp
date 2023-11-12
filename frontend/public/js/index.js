// chat toggle
const chatButton = document.querySelector('.chat');
const chatRoom = document.getElementById('chatroom');

chatButton.addEventListener('click', function () {
  if (chatRoom.style.display === 'none' || chatRoom.style.display === '') {
    chatRoom.style.display = 'flex';
  } else {
    chatRoom.style.display = 'none';
  }
});

// post modal toggle
const postButton = document.querySelector('.post');
const postModal = document.querySelector('.modal');

postButton.addEventListener('click', function (e) {
  e.preventDefault();
  if (postModal.style.display === 'none' || postModal.style.display === '') {
    postModal.style.display = 'block';
  } else {
    postModal.style.display = 'none';
  }
});

// post modal close
const closeButton = document.querySelector('.close-button');

closeButton.addEventListener('click', function () {
  postModal.style.display = 'none';
});

// publish button activation
const publishButton = document.querySelector('.publish-button');

publishButton.addEventListener('click', async function () {
  const postTitle = document.querySelector(`input[name='postTitle']`);
  const postContent = document.querySelector(`textarea[name='postContent']`);

  // axios communication with backend
  const axiosPath = `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/create`;
  const axiosBody = {
    postBody: {
      postTitle: postTitle.value,
      postContent: postContent.value,
    },
    userNickname: 'test',
  };
  const axiosOptions = {
    withCredentials: true,
  };

  const response = await axios.post(axiosPath, axiosBody, axiosOptions);

  postModal.style.display = 'none';

  location.href = '/';
});
