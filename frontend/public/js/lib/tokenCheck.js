const tokenCheck = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  if (token !== null) {
    localStorage.setItem("token", token)
    location.href = "/"
  }
}

tokenCheck()