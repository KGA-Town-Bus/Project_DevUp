if(localStorage.getItem('token') !== null){
  let count = 0;
  const socket = io(`${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/visitors`, {
    auth: {
      token: localStorage.getItem('token'),
    },
  });


  const targetElement = document.getElementById("visitors-contents")
  socket.on('userList', userList => {
    targetElement.innerHTML = ""
    count = 0;
    userList.forEach((user) => {
      count++;
      const div = document.createElement("div")
      div.style.display = "flex"
      div.style.alignItems = "center"
      div.style.gap = "10px"
      div.style.color = "white"

      div.dataset.user = `${user.Users_uid}`

      const img =  document.createElement("img")
      img.src = user.Users_profile
      img.style.width = "50px";
      img.style.height = "50px"

      const p = document.createElement("p")
      p.innerText = `${user.Users_nickname}(${user.Role_authority})`

      div.appendChild(img)
      div.appendChild(p)
      targetElement.appendChild(div)
    })

    const countElement = document.createElement("p")
    countElement.style.color = "white"
    countElement.style.textAlign = "center"
    countElement.style.fontSize = "20px"
    countElement.style.marginBottom = "20px"
    countElement.id = "visitors-count"




    countElement.innerText = `${count}명의 유저가 접속 중 입니다.`
    targetElement.insertBefore(countElement, targetElement.firstChild)




  });

  socket.on('userExit', (userList) => {
    targetElement.innerHTML = ""
    count = 0;

    userList.forEach((user) => {
      count++;
      const div = document.createElement("div")
      div.style.display = "flex"
      div.style.alignItems = "center"
      div.style.gap = "10px"
      div.style.color = "white"


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

    const countElement = document.createElement("p")
    countElement.style.color = "white"
    countElement.style.textAlign = "center"
    countElement.style.fontSize = "20px"
    countElement.style.marginBottom = "20px"
    countElement.id = "visitors-count"




    countElement.innerText = `${count}명의 유저가 접속 중 입니다.`
    targetElement.insertBefore(countElement, targetElement.firstChild)

  });

}




