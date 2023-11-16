if(localStorage.getItem('token') !== null){

  const socket = io(`${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/visitors`, {
    auth: {
      token: localStorage.getItem('token'),
    },
  });


  const targetElement = document.getElementById("visitors-contents")
  socket.on('userList', userList => {
    targetElement.innerHTML = ""
    userList.forEach((user) => {
      const div = document.createElement("div")
      div.style.display = "flex"
      div.style.alignItems = "center"
      div.style.gap = "10px"

      div.dataset.user = `${user.Users_uid}`

      const img =  document.createElement("img")
      img.src = user.Users_profile
      img.style.width = "50px";
      img.style.height = "50px"

      const p = document.createElement("p")
      p.innerText = `${user.Users_provider}:${user.Role_authority} / ${user.Users_nickname}`

      div.appendChild(img)
      div.appendChild(p)
      targetElement.appendChild(div)
    })
  });

  socket.on('userExit', (userList) => {
    targetElement.innerHTML = ""

    userList.forEach((user) => {
      const div = document.createElement("div")
      div.style.display = "flex"
      div.style.alignItems = "center"
      div.style.gap = "10px"

      div.dataset.user = `${user.Users_uid}`

      const img =  document.createElement("img")
      img.src = user.Users_profile
      img.style.width = "50px";
      img.style.height = "50px"

      const p = document.createElement("p")
      p.innerText = `${user.Users_provider}:${user.Role_authority} / ${user.Users_nickname}`

      div.appendChild(img)
      div.appendChild(p)
      targetElement.appendChild(div)
    })
  });

}




