// 메인 sql more 버튼 클릭 로직
const moreBtn = document.querySelector(".more-btn");
const selectSql = document.querySelector("#sqlSelect");
const sqlBtnMore = document.querySelectorAll(".sql-btn-more");

moreBtn.addEventListener("click", () => {
  selectSql.style.visibility = "visible";
});

// 메인 sql select버튼 로직
const allSqlBtn = document.querySelectorAll(".sql-btn");
const domFrag = new DocumentFragment();
const sqlSyntaxArray = [];

allSqlBtn.forEach((sqlBtn) => {
  sqlSyntaxArray.push(sqlBtn.innerText.replaceAll(" ", "_"));
});

sqlSyntaxArray.forEach((sqlSyntax) => {
  const sqlOption = document.createElement("option");
  sqlOption.value = sqlSyntax;
  sqlOption.innerText = sqlSyntax;
  domFrag.appendChild(sqlOption);
});

selectSql.appendChild(domFrag);
