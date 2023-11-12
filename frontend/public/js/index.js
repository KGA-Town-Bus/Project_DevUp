// chat toggle
const chatButton = document.querySelector('.chat');
const chatRoom = document.getElementById('chatroom');

chatButton.addEventListener('click', function () {
  if (chatRoom.style.display === 'none' || chatRoom.style.display === '') {
    chatRoom.style.display = 'block';
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
