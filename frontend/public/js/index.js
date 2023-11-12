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

const closeButton = document.querySelector('.close-button');

closeButton.addEventListener('click', function () {
  postModal.style.display = 'none';
});

const publishButton = document.querySelector('.publish-button');

publishButton.addEventListener('click', async function () {
  const postTitle = document.querySelector(`input[name='postTitle']`);
  const postContent = document.querySelector(`textarea[name='postContent']`);

  const response = await axios.post(
    `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/create`,
    {
      postBody: {
        postTitle: postTitle.value,
        postContent: postContent.value,
      },
      userNickname: 'test',
    },
    {
      withCredentials: true,
    },
  );

  console.log(response);
});
