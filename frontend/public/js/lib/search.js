document.getElementById("search").addEventListener("input", async(e) => {

  const page = 1
  const searchString = e.target.value

  const {data: postList} = await axios.get(`${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/?page=${page}&search=${searchString}`)



})