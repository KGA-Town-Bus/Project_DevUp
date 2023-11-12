// 페이지 로딩 시 CKEditor 초기화
let editorInstance = null;

function initializeEditor() {
  if (!editorInstance) {
    ClassicEditor.create(document.querySelector('#editor'), {
      toolbar: ['bold', 'italic', 'link', 'imageUpload'],
      image: {
        toolbar: [
          'imageTextAlternative',
          '|',
          'imageStyle:full',
          'imageStyle:side',
        ],
      },
      simpleUpload: {
        uploadUrl: '서버 엔드포인트 URL',
      },
    })
      .then(editor => {
        editorInstance = editor;
      })
      .catch(error => {
        console.error(error);
      });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const postButton = document.querySelector('.post.bs'); // 적절한 선택자 사용
  if (postButton) {
    postButton.addEventListener('click', function () {
      document.querySelector('.modal').style.display = 'block';
      initializeEditor();
    });
  } else {
    console.error('Post button not found');
  }
});

document.querySelector('.close-button').addEventListener('click', function () {
  document.querySelector('.modal').style.display = 'none';
  if (editorInstance) {
    document.querySelector('#editor').style.display = 'none';
  }
});

document
  .querySelector('.publish-button')
  .addEventListener('click', async function () {
    if (editorInstance) {
      const editorData = editorInstance.getData();
      const title = document.querySelector('.postTitle').value;
      const content = editorData.replace(/<[^>]*>/g, '');

      try {
        const response = await axios.post(
          `${backServer.PROTOCOL}://${backServer.BACKEND_SERVER_IP}:${backServer.BACKEND_SERVER_PORT}/create`,
          {
            // URL 수정
            postTitle: title,
            postContent: content,
          },
          {
            withCredentials: true,
          },
        );

        console.log('Data sent successfully', response);
        location.href = '/'; // 서버 응답 후 리다이렉트
      } catch (error) {
        console.error('Error sending data', error);
      }
    }
  });
