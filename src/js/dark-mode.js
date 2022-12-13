const $body = document.querySelector("body");
const $switchBtn = $body.querySelector(".btn-darkmode");

function toggleMode() {
  const $sideBar = $body.querySelector(".side-bar");
  const $header = $body.querySelector(".global-header")
  const $main = $body.querySelector("main");
  const $sqlBtnWrap = $sideBar.querySelector(".sql-btn-wrap");

  $body.classList.toggle("dark-mode");
  $sideBar.classList.toggle("dark-mode");
  $header.classList.toggle("dark-mode");
  $switchBtn.classList.toggle("dark-mode");
  $main.classList.toggle("dark-mode");
  $sqlBtnWrap.classList.toggle("dark-mode");
}

$switchBtn.addEventListener("click", toggleMode);
