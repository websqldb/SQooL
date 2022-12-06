const $body = document.querySelector("body");
const $switchBtn = $body.querySelector(".btn-darkmode");

function toggleMode() {
  const $sideBar = $body.querySelector(".side-bar");
  const $header = $body.querySelector(".global-header")

  $body.classList.toggle("dark-mode");
  $sideBar.classList.toggle("dark-mode");
  $header.classList.toggle("dark-mode");
  $switchBtn.classList.toggle("dark-mode");
}
$switchBtn.addEventListener("click", toggleMode);
