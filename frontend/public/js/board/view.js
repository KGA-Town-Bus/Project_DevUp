document.querySelector('#delete').addEventListener('submit', async e => {
  e.preventDefault();
  const {data: response} = await axios.delete(
    '{{backServer.PROTOCOL}}://{{backServer.BACKEND_SERVER_IP}}:{{backServer.BACKEND_SERVER_PORT}}/posts/{{post.postUid}}',
    {},
    {
      withCredentials: true,
    },
  );
  location.href = `/`;
});

document.querySelector('#like').addEventListener('submit', async e => {
  e.preventDefault();

  const response = await axios.post(
    '{{backServer.PROTOCOL}}://{{backServer.BACKEND_SERVER_IP}}:{{backServer.BACKEND_SERVER_PORT}}/posts/{{post.postUid}}/like',
    {},
    {
      withCredentials: true,
    },
  );
  const likeCountElement = document.getElementById('likeCount');
  likeCountElement.textContent = response.data.likedCount;
});
