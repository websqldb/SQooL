// const $mainStatementClipboard = document.querySelector(".code");
// const $mainStatementBtn = document.querySelector(".btn-copy");
// const $mainStatementCodeLine =
//   $mainStatementClipboard.querySelector("textarea");

// function toast() {
//   const $toastClipBoard = document.querySelector("#toastClipBoard");
//   $toastClipBoard.classList.contains("reveal")
//     ? (clearTimeout(removeToast),
//       (removeToast = setTimeout(function () {
//         $toastClipBoard.classList.remove("reveal");
//       }, 1000)))
//     : (removeToast = setTimeout(function () {
//         $toastClipBoard.classList.remove("reveal");
//       }, 1000));
//   $toastClipBoard.classList.add("reveal");
// }

// $mainStatementBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   window.navigator.clipboard
//     .writeText($mainStatementCodeLine.value)
//     .then(() => {
//       toast();
//     });
// });
