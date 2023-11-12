document.querySelector('form').addEventListener('submit', async e => {
  e.preventDefault();
  const body = {
    postTitle: e.target.postTitle.value,
    postContent: e.target.postContent.value,
  };
  const {data: response} = await axios.put(
    '{{backServer.PROTOCOL}}://{{backServer.BACKEND_SERVER_IP}}:{{backServer.BACKEND_SERVER_PORT}}/posts/{{id}}',
    body,
    {
      withCredentials: true,
    },
  );

  location.href = `/posts/${response.postUid}`;
});
