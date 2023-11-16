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
      if (!postTitle.trim() || !postContent.trim()) {
        alert('제목과 내용을 모두 입력해주세요.');
        return; // 함수 실행 중단
      }

      // axios communication with backend
      const axiosPath = `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/create`;
      const axiosBody = {
        postTitle,
        postContent,
      };
      const axiosOptions = {
        withCredentials: true,
      };

      try {
        const {
          data: {data},
        } = await axios.post(axiosPath, axiosBody, axiosOptions);

        const postUid = data; // 서버 응답 구조에 따라 조정 필요

        location.href = `/posts/${postUid}`;
      } catch (error) {
        console.error('Error during post creation:', error);
        // 오류 처리 로직 추가
      }
    });
  }
});
