const socket = io('http://localhost:4000/chat');

const form = document.querySelector('.chat-form');
const input = document.querySelector('.chat-input');
const messages = document.getElementById('messages');

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

socket.on('chat message', msg => {
  const item = `<div class="message-area">
  <div class="message-user">
    <div class="msg-pfp">IMG</div>
    <span class="msg-username">Username</span>
  </div>

  <div class="message-date"><span>2023.11.11 11:00</span></div>

  <div class="message">
    <span
      >${msg}</span
    >
  </div>
</div>`;
  messages.innerHTML += item;
  //   window.scrollTo(0, document.body.scrollHeight);
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
