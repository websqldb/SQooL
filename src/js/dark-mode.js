const $body = document.querySelector("body");
const $switchBtn = $body.querySelector(".btn-darkmode");
let editortoggle = true;

function toggleMode() {
  const $sideBar = $body.querySelector(".side-bar");
  const $header = $body.querySelector(".global-header");
  const $main = $body.querySelector("main");
  const $editor = $body.querySelector(".cm-keyword");
  
  $body.classList.toggle("dark-mode");
  $sideBar.classList.toggle("dark-mode");
  $header.classList.toggle("dark-mode");
  $switchBtn.classList.toggle("dark-mode");
  $main.classList.toggle("dark-mode");
  // 에디터 하이라이터 다크모드 부분입니다!
  if(editortoggle){
    $editor.style.color = "#FFBB56";
    editortoggle = false;
  }else{
    $editor.style.color = "#5966ec";
    editortoggle = true;
  }
}
$switchBtn.addEventListener("click", toggleMode);

