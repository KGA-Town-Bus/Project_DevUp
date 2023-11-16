ClassicEditor.create(document.querySelector('.editor'), {
  cloudServices: {
    tokenUrl:
      'https://101713.cke-cs.com/token/dev/k6tH6AWBGrhhJdnVCnXE5dongVHACcmjdm1h?limit=10',
    uploadUrl: 'https://101713.cke-cs.com/easyimage/upload/',
  },
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
