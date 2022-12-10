const $cheatStatementBtn = document.querySelectorAll(".cheatsheet-clipboard-btn");

$cheatStatementBtn.forEach(button => {
  button.addEventListener("click", () => {
    if(button.nextElementSibling.classList.contains("cheatsheet-sql")){
      window.navigator.clipboard
      .writeText(button.nextElementSibling.innerText)
      .then(() => {
        alert("복사완료");
      });
    };
  });
});