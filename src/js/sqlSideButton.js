const sqlBtnWrap = document.querySelector(".sql-btn-wrap");

// 메인 sql more 버튼 클릭 로직
const moreBtn = sqlBtnWrap.querySelector(".more-btn");
const selectSql = sqlBtnWrap.querySelector("#sqlSelect");
const sqlBtnMore = sqlBtnWrap.querySelectorAll(".sql-btn-more");

moreBtn.addEventListener("click", () => {
  selectSql.style.visibility = "visible";
});

// 메인 sql select버튼 로직
const sqlBtnItemList = sqlBtnWrap.querySelector(".sql-btn-item");
let sqlSyntaxArray = [];

selectSql.addEventListener("click", () => {
  const selectedIndex = selectSql.options.selectedIndex;
  const selectedSqlOptionValue = selectSql.options.item(selectedIndex).value;

  if (
    !sqlSyntaxArray.includes(selectedSqlOptionValue) &&
    selectedSqlOptionValue !== ""
  ) {
    sqlSyntaxArray.unshift(selectedSqlOptionValue);
    addSqlBtnToItemList(sqlSyntaxArray);
  }

  if (sqlSyntaxArray.length === 26) selectSql.disabled = true;
});

function addSqlBtnToItemList(array) {
  if (array.length !== 0) {
    const sqlOptionValue = array[0];
    const sqlBtn = document.createElement("button");

    sqlBtn.innerText = sqlOptionValue.replaceAll("_", " ");
    sqlBtn.classList.add("sql-btn");
    sqlBtn.setAttribute("data-sql", sqlOptionValue);
    sqlBtnItemList.appendChild(sqlBtn);
  }
}
