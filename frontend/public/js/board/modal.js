// 페이지 로딩 시 CKEditor 초기화
document.addEventListener('DOMContentLoaded', function () {
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
      uploadUrl: '서버 엔드포인트 URL', // 실제 이미지를 업로드할 서버의 URL
    },
  })
    .then(editor => {
      window.editor = editor; // 전역 변수에 에디터 인스턴스 저장
    })
    .catch(error => {
      console.error(error);
    });
});

// 모달 닫기 이벤트 처리
document.querySelector('.close-button').addEventListener('click', function () {
  document.querySelector('.modal').style.display = 'none';
  if (window.editor) {
    window.editor
      .destroy()
      .then(() => {
        window.editor = null;
      })
      .catch(error => {
        console.error('There was a problem destroying the editor:', error);
      });
  }
});

document
  .querySelector('.publish-button')
  .addEventListener('click', function () {
    if (window.editor) {
      const editorData = window.editor.getData();
      const title = document.querySelector('.post-title').value;
      const content = editorData.replace(/<[^>]*>/g, '');

      console.log(title);
      console.log(content);

      axios
        .post(
          '{{backServer.PROTOCOL}}://{{backServer.BACKEND_SERVER_IP}}:{{backServer.BACKEND_SERVER_PORT}}/create',
          {
            postTitle: title,
            postContent: content,
          },
          {
            withCredentials: true,
          },
        )
        .then(response => {
          console.log('Data sent successfully', response);
        })
        .catch(error => {
          console.error('Error sending data', error);
        });
    }
  });

// CKEDITOR.ClassicEditor.create(document.querySelector('#editor'), {
//   licenseKey:
//     'TFo5S1VQc3BXWk55NW1MVXhsa2VsRWYvaDY0R0lESVNpSS85bTB1emdQWElVRmZ1Vkp0Qld6ZmNCR3dJLU1qQXlNekV5TVRJPQ==',
// });
