const $dataItems = document.querySelectorAll('.list-database-download-item > li');
const $table = document.querySelector('.sec-result table');

$dataItems.forEach((item) => {
  item.addEventListener('click', async () => {
    const db = item.childNodes[0].textContent.trim();
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/websqldb/SQooL/main/data/${db}.json`
      );
      const data = await response.json();

      createTable(data);
    } catch (err) {
      console.log(err);
    }
  });
});

const createTable = (data) => {
  removeTable();

  const $colgroup = document.createElement('colgroup');
  const $tbody = document.createElement('tbody');
  const $tr = document.createElement('tr');

  Object.keys(data[0]).forEach(() => {
    const $col = document.createElement('col');
    $col.classList.add('table-cell');
    $colgroup.appendChild($col);
  });

  Object.keys(data[0]).forEach((colName) => {
    const $th = document.createElement('th');
    $th.textContent = charToNumber(colName);
    $tr.appendChild($th);
  });
  $tbody.appendChild($tr);

  for (let row of data) {
    const $tr = document.createElement('tr');
    for (let value of Object.values(row)) {
      const $td = document.createElement('td');
      $td.textContent = value;
      $tr.appendChild($td);
    }
    $tbody.appendChild($tr);
  }

  $table.append($colgroup, $tbody);
};

const removeTable = () => {
  while ($table.firstChild) {
    $table.removeChild($table.firstChild);
  }
};

const charToNumber = (data) => {
  const regex = /[(일|이|삼|사)]학년[(일|이|삼|사)]학기/gi;
  if (!regex.test(data)) return data;

  const char = ['일', '이', '삼', '사'];
  console.log('실행');
  for (let i = 0; i < 4; i++) {
    const re = new RegExp(`${char[i]}학년`, 'gi');
    data = data.replaceAll(re, `${i + 1}학년`);
  }
  for (let i = 0; i < 4; i++) {
    const re2 = new RegExp(`${char[i]}학기`, 'gi');
    data = data.replaceAll(re2, `${i + 1}학기`);
  }
  return data;
};
