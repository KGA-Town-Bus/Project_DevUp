
document.getElementById("profile-input").addEventListener("change",async (e)=>{
  const form = document.getElementById("profile-form")
  const formData = new FormData(form)


  const {data} = await axios.post(
      "https://api-devup.hyunjun.kr/users/profile",
      // "http://localhost:4000/users/profile",
      formData,
      {
        withCredentials: true
      }
  )

  const profileURL = data.data
  document.getElementById("profile-img").src = profileURL



})


const errorCheck = () => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const error = params.get('error');
  if (error) {
    alert(error);
    location.href = '/users/profile';

  }
}
errorCheck()