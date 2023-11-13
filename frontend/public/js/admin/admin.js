const clickedAccountLocked = () => {

  const contents = document.getElementById("contents")
  contents.addEventListener("change", async(e) => {
    const targetId = e.target.dataset.id

    await axios.patch("http://localhost:4000/admin/users",{
      userUid: targetId
    },{})


  })

}

clickedAccountLocked()