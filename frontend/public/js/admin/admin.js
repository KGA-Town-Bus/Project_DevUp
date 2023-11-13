const clickedAccountLocked = () => {

  const contents = document.getElementById("contents")
  contents.addEventListener("change", async(e) => {
    const targetId = e.target.dataset.id

    const {data: {data}} = await axios.patch("http://localhost:4000/admin/users",{
      userUid: targetId
    },{})

    if(data === 1){
      const target = e.target.parentNode

      if (target.innerText === "true"){
        target.innerHTML = "false" + e.target.outerHTML;
      }else if(target.innerText === "false"){
        target.innerHTML = "true" + e.target.outerHTML;
      }

    }


  })

}

clickedAccountLocked()