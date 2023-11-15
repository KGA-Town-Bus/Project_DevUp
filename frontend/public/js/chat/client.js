const socket = io('http://localhost:4000', {
  auth: {
    token: localStorage.getItem('token'),
  },
});

const form = document.querySelector('.chat-form');
const input = document.querySelector('.chat-input');
const messages = document.getElementById('messages');
const chatBody = document.querySelector('.chat-body');
let currentUser = null;

// Handle user information
socket.on('userinfo', user => {
  console.log('userinfo received at the client');
  currentUser = user; // Store the current user's information
  socket.emit('register', user.Users_uid);
});

// Handle incoming chat messages
socket.on('chat message', (msg, date, senderInfo) => {
  const item = `<div class="message-area">
    <div class="meta-msg">

    <div class="message-user">
      <img src="${senderInfo.profile}" class="msg-pfp"></img>
      <span class="msg-username">${senderInfo.nickname}</span>
    </div>
    
    <div class="message-date"><span>${date}</span></div>

    </div>

    <div class="message"><span>${msg}</span></div>
  </div>`;
  messages.innerHTML += item;
  chatBody.scrollTop = chatBody.scrollHeight;
});

// Send message
form.addEventListener('submit', e => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

// Additional socket event handlers can be added here
