window.onload = function () {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
};

document.getElementById("login-btn").addEventListener("click", function () {
  const userName = document.getElementById("username");
  const userNameInput = userName.value;

  const passWord = document.getElementById("password");
  const passWordInput = passWord.value;

  if (userNameInput === "admin" && passWordInput === "admin123") {
    alert("LOGIN SUCCESSFUL");
    userName.value = "";
    passWord.value = "";
    window.location.assign("../home.html");
  } else {
    alert("ENTER VALID INFO");
    userName.value = "";
    passWord.value = "";
  }
});
