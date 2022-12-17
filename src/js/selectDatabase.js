const $dataItems = document.querySelectorAll('.list-database-download-item > li');
const $table = document.querySelector('.sec-result table');

$dataItems.forEach((item) => {
  item.addEventListener('click', async () => {
    const db = item.childNodes[0].textContent.trim();
    try {
      const response = await fetch(`https://raw.githubusercontent.com/websqldb/SQooL/main/data/${db}.json`);
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
    $th.textContent = colName;
    $tr.appendChild($th);
  })
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
}

const removeTable = () => {
  while ($table.firstChild) {
    $table.removeChild($table.firstChild);
  }
};