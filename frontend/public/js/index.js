// chat toggle
const chatButton = document.querySelector('.visitors-button');
const chatRoom = document.getElementById('visitors');

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

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.post-container').forEach(postContainer => {
    // 게시물에 이미지가 있는지 확인 (예: post 객체의 postImage 속성)
    if (postContainer.dataset.postImage) { // postImage는 게시물의 이미지 URL을 나타냅니다.
      const imageIcon = postContainer.querySelector('.image-icon');
      imageIcon.style.display = 'inline'; // 이미지 아이콘 표시
    }
  });
});
