document.addEventListener('DOMContentLoaded', function () {
  const likeButton = document.querySelector('#like-button');
  const deleteButton = document.querySelector('.delete-button');
  const modifyButton = document.querySelector('.modify-button');
  const postButton = document.querySelector('.post');
  if (likeButton) {
    likeButton.addEventListener('click', async function () {
      const url = window.location.pathname;
      const postUid = url.substring(url.lastIndexOf('/') + 1);
      const axiosPath = `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/posts/${postUid}/like`;

      try {
        const response = await axios.post(
          axiosPath,
          {},
          {withCredentials: true},
        );
        const likedCount = response.data.likedCount;
        document.getElementById('likeCount').textContent = likedCount;
      } catch (error) {
        console.error('Error during like request:', error);
      }
    });
  }

  if (deleteButton) {
    deleteButton.addEventListener('click', async function () {
      const url = window.location.pathname;
      const postUid = url.substring(url.lastIndexOf('/') + 1);
      console.log(url);
      console.log(postUid);
      const axiosPath = `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/posts/${postUid}`;

      try {
        const response = await axios.delete(axiosPath, {withCredentials: true});
        location.href = '/';
      } catch (error) {
        console.error('Error during post deletion:', error);
      }
    });
  }
  if (modifyButton) {
    modifyButton.addEventListener('click', async function () {
      const postUid = this.getAttribute('data-postid');
      window.location.href = `/modify/${postUid}`;
    });
  }
  if (postButton) {
    postButton.addEventListener('click', function () {
      window.location.href = '/create';
    });
  }
});
