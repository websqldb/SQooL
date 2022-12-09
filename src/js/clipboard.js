const $mainStatementClipboard = document.querySelector(".code");
const $mainStatementBtn = document.querySelector(".btn-copy");
const $mainStatementCodeLine =
  $mainStatementClipboard.querySelector(".code-line");

const $cheatStatementClipboard = document.querySelector(".cheatsheet-list");
const $cheatStatementBtn = document.querySelectorAll(".cheatsheet-clipboard-btn");

$mainStatementBtn.addEventListener("click", () => {
  window.navigator.clipboard
    .writeText($mainStatementCodeLine.innerText)
    .then(() => {
      alert("복사완료");
    });
});

