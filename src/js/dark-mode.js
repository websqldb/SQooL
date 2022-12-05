const $body = document.querySelector("body");
const $switchBtn = $body.querySelector(".btn-darkmode");

function toggleMode() {
  $body.classList.toggle("dark-mode");
  const $sideBar = $body.querySelector(".side-bar");
  $sideBar.classList.toggle("dark-mode");
}
$switchBtn.addEventListener("click", toggleMode);
