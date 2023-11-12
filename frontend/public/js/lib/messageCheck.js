const messageCheck = () => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const error = params.get('error');
  const message = params.get("message")
  if (error) {
    alert(error);
    location.href = '/';
  }
  if(message){
    alert(message)
    location.href =  "/"
  }
}
messageCheck()