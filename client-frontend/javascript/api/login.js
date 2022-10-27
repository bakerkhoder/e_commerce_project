
const authSubmitBtn = document.getElementById("login");

    authSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const data = new FormData()
    data.append('user_indentifier', usernameInput.value)
    data.append('password', passwordInput.value)
    console.log(data.password)
  axios({
    method: "post",
    url: "http://localhost/e-commerce-project/e-commerce-server/api/login.php",
 data,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      console.log(response.data)
      if (response.status == 1) {
        usernameInput.value = "";
        passwordInput.value = "";
       } else {
        console.log(response.data)
        const localStorageData = [];
        localStorageData.push(response.data.data.user_id);
        localStorageData.push(response.data.data.username);
        localStorageData.push(response.data.data.token);
        localStorageData.push(response.data.data.email);
        localStorage.setItem("auth", JSON.stringify(localStorageData));
        window.setTimeout(function () {
        window.location.href = "homepage.html";
        }, 2000);
      }
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
});


