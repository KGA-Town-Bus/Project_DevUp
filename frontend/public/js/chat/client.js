const socket = io('http://localhost:4000', {
  auth: {
    token: localStorage.getItem('token'),
  },
});

const form = document.querySelector('.chat-form');
const input = document.querySelector('.chat-input');
const messages = document.getElementById('messages');
const chatBody = document.querySelector('.chat-body');

form.addEventListener('submit', e => {
  console.log('so this is working?');
  e.preventDefault();
  if (input.value) {
    console.log(input.value);

    socket.emit('chat message', input.value);

    console.log('socket emitted?');
    input.value = '';
  }
});

socket.on('userinfo', user => {
  console.log('userinfo received at the client');

  socket.on('chat message', (msg, date) => {
    const item = `<div class="message-area">
    <div class="message-user">
      <img src="${user.Users_profile}" class="msg-pfp"></img>
      <span class="msg-username">${user.Users_nickname}</span>
    </div>
  
    <div class="message-date"><span>${date}</span></div>
  
    <div class="message">
      <span
        >${msg}</span
      >
    </div>
  </div>`;
    messages.innerHTML += item;
    chatBody.scrollTop = chatBody.scrollHeight;
  });
});

// socket.on('roommsg', data => {
//   console.log(data);
// });

// socket.on('excluderoom', data => {
//   console.log(data);
// });

// socket.on('leaveroom', () => {
//   console.log('you left the room');
// });
