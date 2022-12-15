const $mainStatementClipboard = document.querySelector(".code");
const $mainStatementBtn = document.querySelector(".btn-copy");
const $mainStatementCodeLine =
  $mainStatementClipboard.querySelector("textarea");

$mainStatementBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.navigator.clipboard
    .writeText($mainStatementCodeLine.value)
    .then(() => {
      alert("복사완료");
    });
});
