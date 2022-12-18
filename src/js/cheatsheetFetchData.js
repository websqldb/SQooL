const main = document.querySelector("main");
const fileNameArray = [
  "tableoutput",
  "tablegetdata",
  "getConditionData",
  "getDataMultipleTable",
  "function",
  "grouping",
  "manageTable",
];

async function loadTotalData() {
  for (let i = 0; i < fileNameArray.length; i++) {
    const response = await fetch(
      `../../data/cheatsheetData/${fileNameArray[i]}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        const section = document.createElement("section");
        const sectionName = document.createElement("h3");
        const sectionUl = document.createElement("ul");

        section.classList.add("cheatsheet-wrapper");
        sectionUl.classList.add("cheatsheet-list");
        sectionName.innerHTML = data[0].title;
        section.appendChild(sectionName);
        section.appendChild(sectionUl);
        for (let i = 1; i < data.length; i++) {
          const sectionLi = document.createElement("li");
          if (i === 1 && data[i].img) {
            sectionLi.innerHTML = `
            <img class="cheatsheet-sql" style="width: 100%" src=${data[1].img}>
            </img>
            <p class="cheatsheet-sql-explanation">
              ${data[1].cap}
            </p>
            `;
          } else {
            const stringSplit = data[i].syntax.split("\n");

            const syntaxReplace = data[i]?.syntax.replace(
              /(?:\r\n|\r|\n)/g,
              "<br>"
            );

            sectionLi.innerHTML = `
              <button class="cheatsheet-clipboard-btn">
                <img
                  src="../src/assets/images/cheatsheet-clipboard-btn.png"
                  alt="clipboard-button"
                />
              </button>
              <p class="cheatsheet-sql">
                <strong class="cheatsheet-sql-statement">${syntaxReplace}</strong>
              </p>
              <p class="cheatsheet-sql-explanation">
                ${data[i].desc}
              </p>
              `;
          }
          sectionUl.appendChild(sectionLi);
        }
        main.appendChild(section);
      })
      .then((data) => {
        // 치트시트 사이드 바 메뉴 클릭 시 스크롤 이벤트 추가
        const sidebarList = document.querySelectorAll(".list-item li");
        const sectionList = document.querySelectorAll(".cheatsheet-list");

        sidebarList.forEach((item, i) => {
          item.addEventListener("click", () => {
            const sectionTop = sectionList[i]?.offsetTop;

            window.scrollTo({
              top: sectionTop - 100,
              left: 0,
              behavior: "smooth",
            });
          });
        });
      });
  }
}
loadTotalData();
