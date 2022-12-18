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
// 1. 테이블에서 출력하기
// function tableOutPut() {
//   fetch("../../data/cheatsheetData/tableoutput.json")
//     .then((res) => res.json())
//     .then((data) => {
//       const section = document.createElement("section");
//       const sectionName = document.createElement("h3");
//       const sectionUl = document.createElement("ul");
//       section.classList.add("cheatsheet-wrapper");
//       sectionUl.classList.add("cheatsheet-list");
//       sectionName.innerHTML = data[0].title;
//       section.appendChild(sectionName);
//       section.appendChild(sectionUl);
//       for (let i = 1; i < data.length; i++) {
//         const sectionLi = document.createElement("li");
//         sectionLi.innerHTML = `
//           <button class="cheatsheet-clipboard-btn">
//             <img
//               src="../src/assets/images/cheatsheet-clipboard-btn.png"
//               alt="clipboard-button"
//             />
//           </button>
//           <p class="cheatsheet-sql">
//             <strong class="cheatsheet-sql-statement">${data[i].syntax}</strong>
//           </p>
//           <p class="cheatsheet-sql-explanation">
//             ${data[i].desc}
//           </p>
//         `;
//         sectionUl.appendChild(sectionLi);
//       }
//       main.appendChild(section);
//     });
// }

// // 2. 테이블에서 데이터 가져오기
// function tablegetdata() {
//   fetch("../../data/cheatsheetData/tablegetdata.json")
//     .then((res) => res.json())
//     .then((data) => {
//       const section = document.createElement("section");
//       const sectionName = document.createElement("h3");
//       const sectionUl = document.createElement("ul");
//       // console.log(data);
//       section.classList.add("cheatsheet-wrapper");
//       sectionUl.classList.add("cheatsheet-list");
//       sectionName.innerHTML = data[0].title;
//       section.appendChild(sectionName);
//       section.appendChild(sectionUl);
//       for (let i = 1; i < data.length; i++) {
//         const sectionLi = document.createElement("li");
//         const syntaxReplace = data[i].syntax.replace(/(?:\r\n|\r|\n)/g, "<br>");
//         sectionLi.innerHTML = `
//           <button class="cheatsheet-clipboard-btn">
//             <img
//               src="../src/assets/images/cheatsheet-clipboard-btn.png"
//               alt="clipboard-button"
//             />
//           </button>
//           <p class="cheatsheet-sql">
//             <strong class="cheatsheet-sql-statement">${syntaxReplace}</strong>
//           </p>
//           <p class="cheatsheet-sql-explanation">
//             ${data[i].desc}
//           </p>
//         `;
//         sectionUl.appendChild(sectionLi);
//       }
//       main.appendChild(section);
//     });
// }

// // 3. 테이블에서 조건에 맞는 데이터 가져오기
// function getConditionData() {
//   fetch("../../data/cheatsheetData/getConditionData.json")
//     .then((res) => res.json())
//     .then((data) => {
//       const section = document.createElement("section");
//       const sectionName = document.createElement("h3");
//       const sectionUl = document.createElement("ul");
//       // console.log(data);
//       section.classList.add("cheatsheet-wrapper");
//       sectionUl.classList.add("cheatsheet-list");
//       sectionName.innerHTML = data[0].title;
//       section.appendChild(sectionName);
//       section.appendChild(sectionUl);
//       for (let i = 1; i < data.length; i++) {
//         const sectionLi = document.createElement("li");
//         const syntaxReplace = data[i].syntax.replace(/(?:\r\n|\r|\n)/g, "<br>");
//         sectionLi.innerHTML = `
//           <button class="cheatsheet-clipboard-btn">
//             <img
//               src="../src/assets/images/cheatsheet-clipboard-btn.png"
//               alt="clipboard-button"
//             />
//           </button>
//           <p class="cheatsheet-sql">
//             <strong class="cheatsheet-sql-statement">${syntaxReplace}</strong>
//           </p>
//           <p class="cheatsheet-sql-explanation">
//             ${data[i].desc}
//           </p>
//         `;
//         sectionUl.appendChild(sectionLi);
//       }
//       main.appendChild(section);
//     });
// }

// // 4. 다중 테이블에서 데이터 가져오기
// function getDataMultipleTable() {
//   fetch("../../data/cheatsheetData/getDataMultipleTable.json")
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       const section = document.createElement("section");
//       const sectionName = document.createElement("h3");
//       const sectionUl = document.createElement("ul");
//       // console.log(data);
//       section.classList.add("cheatsheet-wrapper");
//       sectionUl.classList.add("cheatsheet-list");
//       sectionName.innerHTML = data[0].title;
//       section.appendChild(sectionName);
//       section.appendChild(sectionUl);
//       for (let i = 1; i < data.length; i++) {
//         const sectionLi = document.createElement("li");
//         if (i === 1) {
//           console.log(data[i]);
//           sectionLi.innerHTML = `

//             <img class="cheatsheet-sql" style="width: 100%" src=${data[1].img}>

//             </img>
//             <p class="cheatsheet-sql-explanation">
//               ${data[1].cap}
//             </p>
//           `;
//         } else {
//           const syntaxReplace = data[i].syntax.replace(
//             /(?:\r\n|\r|\n)/g,
//             "<br>"
//           );
//           sectionLi.innerHTML = `
//             <button class="cheatsheet-clipboard-btn">
//               <img
//                 src="../src/assets/images/cheatsheet-clipboard-btn.png"
//                 alt="clipboard-button"
//               />
//             </button>
//             <p class="cheatsheet-sql">
//               <strong class="cheatsheet-sql-statement">${syntaxReplace}</strong>
//             </p>
//             <p class="cheatsheet-sql-explanation">
//               ${data[i].desc}
//             </p>
//           `;
//         }
//         console.log(data);
//         sectionUl.appendChild(sectionLi);
//       }
//       main.appendChild(section);
//     });
// }

// // 5. 함수
// function functionData() {
//   fetch("../../data/cheatsheetData/function.json")
//     .then((res) => res.json())
//     .then((data) => {
//       const section = document.createElement("section");
//       const sectionName = document.createElement("h3");
//       const sectionUl = document.createElement("ul");
//       // console.log(data);
//       section.classList.add("cheatsheet-wrapper");
//       sectionUl.classList.add("cheatsheet-list");
//       sectionName.innerHTML = data[0].title;
//       section.appendChild(sectionName);
//       section.appendChild(sectionUl);
//       for (let i = 1; i < data.length; i++) {
//         const sectionLi = document.createElement("li");
//         const syntaxReplace = data[i].syntax.replace(/(?:\r\n|\r|\n)/g, "<br>");
//         sectionLi.innerHTML = `
//           <button class="cheatsheet-clipboard-btn">
//             <img
//               src="../src/assets/images/cheatsheet-clipboard-btn.png"
//               alt="clipboard-button"
//             />
//           </button>
//           <p class="cheatsheet-sql">
//             <strong class="cheatsheet-sql-statement">${syntaxReplace}</strong>
//           </p>
//           <p class="cheatsheet-sql-explanation">
//             ${data[i].desc}
//           </p>
//         `;
//         sectionUl.appendChild(sectionLi);
//       }
//       main.appendChild(section);
//     });
// }

// // 6. 그룹핑
// function grouping() {
//   fetch("../../data/cheatsheetData/grouping.json")
//     .then((res) => res.json())
//     .then((data) => {
//       const section = document.createElement("section");
//       const sectionName = document.createElement("h3");
//       const sectionUl = document.createElement("ul");
//       // console.log(data);
//       section.classList.add("cheatsheet-wrapper");
//       sectionUl.classList.add("cheatsheet-list");
//       sectionName.innerHTML = data[0].title;
//       section.appendChild(sectionName);
//       section.appendChild(sectionUl);
//       for (let i = 1; i < data.length; i++) {
//         const sectionLi = document.createElement("li");
//         const syntaxReplace = data[i].syntax.replace(/(?:\r\n|\r|\n)/g, "<br>");
//         sectionLi.innerHTML = `
//           <button class="cheatsheet-clipboard-btn">
//             <img
//               src="../src/assets/images/cheatsheet-clipboard-btn.png"
//               alt="clipboard-button"
//             />
//           </button>
//           <p class="cheatsheet-sql">
//             <strong class="cheatsheet-sql-statement">${syntaxReplace}</strong>
//           </p>
//           <p class="cheatsheet-sql-explanation">
//             ${data[i].desc}
//           </p>
//         `;
//         sectionUl.appendChild(sectionLi);
//       }
//       main.appendChild(section);
//     });
// }

// // 7. 테이블 관리하기
// function manageTable() {
//   fetch("../../data/cheatsheetData/manageTable.json")
//     .then((res) => res.json())
//     .then((data) => {
//       const section = document.createElement("section");
//       const sectionName = document.createElement("h3");
//       const sectionUl = document.createElement("ul");
//       // console.log(data);
//       section.classList.add("cheatsheet-wrapper");
//       sectionUl.classList.add("cheatsheet-list");
//       sectionName.innerHTML = data[0].title;
//       section.appendChild(sectionName);
//       section.appendChild(sectionUl);
//       for (let i = 1; i < data.length; i++) {
//         const sectionLi = document.createElement("li");
//         const syntaxReplace = data[i].syntax.replace(/(?:\r\n|\r|\n)/g, "<br>");
//         sectionLi.innerHTML = `
//           <button class="cheatsheet-clipboard-btn">
//             <img
//               src="../src/assets/images/cheatsheet-clipboard-btn.png"
//               alt="clipboard-button"
//             />
//           </button>
//           <p class="cheatsheet-sql">
//             <strong class="cheatsheet-sql-statement">${syntaxReplace}</strong>
//           </p>
//           <p class="cheatsheet-sql-explanation">
//             ${data[i].desc}
//           </p>
//         `;
//         sectionUl.appendChild(sectionLi);
//       }
//       main.appendChild(section);
//     });
// }

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
            console.log(stringSplit);
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
      });
  }
}
loadTotalData();
// tableOutPut();
// tablegetdata();
// getConditionData();
// getDataMultipleTable();
// functionData();
// grouping();
// manageTable();
