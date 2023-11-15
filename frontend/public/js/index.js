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

// post > create page
const postButton = document.querySelector('.post');

postButton.addEventListener('click', function () {
  window.location.href = '/create';
});

// // post modal close
// const closeButton = document.querySelector('.close-button');

// closeButton.addEventListener('click', function () {
//   postModal.style.display = 'none';
// });

// publish button activation -> handed to CHAMDOM
