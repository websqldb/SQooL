const main = document.querySelector('main');
const fileNameArray = [
  'tableoutput',
  'tablegetdata',
  'getConditionData',
  'getDataMultipleTable',
  'function',
  'grouping',
  'manageTable',
];

let sqlKeyWords =
  'abort action add after all analyze attach autoincrement before begin cascade case cast check collate column commit conflict constraint cross current_date current_time current_timestamp database default deferrable deferred detach each else end escape except exclusive exists explain fail for foreign full glob if ignore immediate index indexed initially inner instead intersect isnull key left limit match natural no notnull null of offset outer plan pragma primary query raise recursive references regexp reindex release rename replace restrict right rollback row savepoint temp temporary then to transaction trigger unique using vacuum view virtual when with without alter and as asc between by count create delete desc distinct drop from group having in insert into is join like not on or order select set table union update values where limit desc asc --right --left --full --where --select desc; asc;'
    .split(' ')
    .map((i) => i.toUpperCase());
sqlKeyWords.push('and');

async function loadTotalData() {
  for (let i = 0; i < fileNameArray.length; i++) {
    const response = await fetch(`../../data/cheatsheetData/${fileNameArray[i]}.json`)
      .then((res) => res.json())
      .then((data) => {
        const section = document.createElement('section');
        const sectionName = document.createElement('h3');
        const sectionUl = document.createElement('ul');

        section.classList.add('cheatsheet-wrapper');
        sectionUl.classList.add('cheatsheet-list');
        sectionName.innerHTML = data[0].title;
        section.appendChild(sectionName);
        section.appendChild(sectionUl);
        for (let i = 1; i < data.length; i++) {
          const sectionLi = document.createElement('li');
          let code = [];
          if (i === 1 && data[i].img) {
            sectionLi.innerHTML = `
            <img class="cheatsheet-sql" style="width: 100%" src=${data[1].img}>
            </img>
            <p class="cheatsheet-sql-explanation">
              ${data[1].cap}
            </p>
            `;
          } else {
            const stringSplit = data[i].syntax.split('\n');

            let syntaxReplace = data[i]?.syntax.replace(/(?:\r\n|\r|\n)/g, '<br>');

            syntaxReplace.split('<br>').forEach((line) => {
              line.split(' ').forEach((i) => {
                if (sqlKeyWords.includes(i)) {
                  code += `<strong class="keyword">${i}</strong>` + ' ';
                } else {
                  code += i + ' ';
                }
              });
              code += '<br>';
            });

            if (data[i].desc.includes('\n')) {
              data[i].desc = data[i].desc.replace('\n', '<br />');
            }

            sectionLi.innerHTML = `
              <button class="cheatsheet-clipboard-btn">
                <img
                  src="../src/assets/images/cheatsheet-clipboard-btn.png"
                  alt="clipboard-button"
                />
              </button>
              <p class="cheatsheet-sql">
                <strong class="cheatsheet-sql-statement">${code}</strong>
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
        const sidebarList = document.querySelectorAll('.list-item li');
        const sectionList = document.querySelectorAll('.cheatsheet-list');

        sidebarList.forEach((item, i) => {
          item.addEventListener('click', () => {
            const sectionTop = sectionList[i]?.offsetTop;

            window.scrollTo({
              top: sectionTop - 100,
              left: 0,
              behavior: 'smooth',
            });
          });
        });
      });
  }
}
loadTotalData();
