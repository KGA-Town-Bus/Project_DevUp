document.addEventListener('DOMContentLoaded', function () {
  const listButton = document.querySelector('.list-button');
  const publishButton = document.querySelector('.publish-button');

  if (listButton) {
    listButton.addEventListener('click', function () {
      window.location.href = '/';
    });
  }
  if (publishButton) {
    publishButton.addEventListener('click', async function () {
      const postTitle = document.querySelector('.postTitle').value;
      const postContent = window.editor.getData();
      const url = window.location.pathname;
      const postUid = url.substring(url.lastIndexOf('/') + 1);

      const axiosPath = `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/posts/${postUid}`;
      const axiosBody = {
        postTitle,
        postContent,
      };

      try {
        const response = await axios.put(axiosPath, axiosBody, {
          withCredentials: true,
        });
        location.href = `/posts/${postUid}`;
      } catch (error) {
        console.error('Error during post update:', error);
      }
    });
  }
});
