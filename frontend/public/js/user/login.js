const errorCheck = () => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const error = params.get('error');
  if (error) {
    alert(error);
    location.href = '/users/login';

  }
}
errorCheck()