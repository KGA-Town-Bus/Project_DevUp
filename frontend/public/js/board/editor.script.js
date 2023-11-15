class MyUploadAdapter {
  constructor(loader) {
    // 파일 로더 인스턴스를 저장합니다.
    this.loader = loader;
  }

  // 시작 시 호출됩니다.
  upload() {
    return this.loader.file.then(
      file =>
        new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        }),
    );
  }

  // 업로드 중단 시 호출됩니다.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // 서버로의 요청을 초기화합니다.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());
    xhr.open('POST', '', true); // 여기에 서버의 파일 업로드 URL을 입력합니다.
    xhr.responseType = 'json';
  }

  // 이벤트 리스너를 초기화합니다.
  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `파일을 업로드할 수 없습니다: ${file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;
      if (!response || !response.uploaded) {
        return reject(
          response && response.error
            ? response.error.message
            : genericErrorText,
        );
      }
      resolve({
        default: response.url, // 서버가 파일 URL을 반환하면 여기에 입력합니다.
      });
    });

    // 업로드 진행 상태를 업데이트합니다.
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', evt => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // 데이터를 서버로 전송합니다.
  _sendRequest(file) {
    const data = new FormData();
    data.append('upload', file);
    this.xhr.send(data);
  }
}

// 에디터 구성에 사용자 정의 어댑터 플러그인을 추가합니다.
function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = loader => {
    return new MyUploadAdapter(loader);
  };
}

ClassicEditor.create(document.querySelector('.editor'), {
  extraPlugins: [MyCustomUploadAdapterPlugin],
})
  .then(editor => {
    window.editor = editor;
  })
  .catch(handleSampleError);

function handleSampleError(error) {
  const issueUrl = 'https://github.com/ckeditor/ckeditor5/issues';

  const message = [
    'Oops, something went wrong!',
    `Please, report the following error on ${issueUrl} with the build id "ex4stuyr031a-cyjqdvef37p3" and the error stack trace:`,
  ].join('\n');

  console.error(message);
  console.error(error);
}
