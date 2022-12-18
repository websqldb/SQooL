// WebSQL 데이터베이스 생성
const database = openDatabase('University', '1.0', 'chrome dabase test', 2 * 1024 * 1024);

// WebSQL 테이블 생성
const createTable = (tableName, tableData) => {
  if (!tableName) return '테이블 이름이 없습니다.';
  if (!tableData) return '테이블 데이터가 없습니다.';

  const columns = [];

  for (let column in tableData[0]) {
    if (column.includes('/')) {
      columns.push(column.split('/').join(''));
    } else {
      columns.push(column.split(' ').join(''));
    }
  }

  return new Promise((resolve, reject) => {
    database.transaction(
      (tx) => {
        tx.executeSql(`DROP TABLE IF EXISTS ${tableName}`);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName}(${String(columns)})`, []);
      },
      [],
      () => {
        resolve();
      },
      () => {
        reject();
      }
    );
  });
};

// WebSQL 데이터 추가
const insertData = (tableName, tableData) => {
  if (!tableName) return '테이블 이름이 없습니다.';
  if (!tableData) return '테이블 데이터가 없습니다.';

  return new Promise((resolve, reject) => {
    database.transaction(
      (tx) => {
        for (let row of tableData) {
          const columns = [];
          const values = [];
          const substitute = [];

          for (let column in row) {
            if (column.includes('/')) {
              columns.push(column.split('/').join(''));
            } else {
              columns.push(column.split(' ').join(''));
            }
            values.push(row[column]);
            substitute.push('?');
          }

          tx.executeSql(
            `INSERT INTO ${tableName}(${String(columns)}) VALUES (${String(substitute)})`,
            values,
            (tx, result) => {},
            (tx, result) => {}
          );
        }
      },
      [],
      () => {
        resolve();
      },
      () => {
        reject();
      }
    );
  });
};

const fetchJSON = async (table) => {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/websqldb/SQooL/main/data/${table}.json`
    );

    const result = await response.json();

    return result;
  } catch (err) {
    alert(`네트워크 에러가 발생했습니다.`);
  }
};

// 초기 세팅용 함수
const initSetting = async (tables) => {
  for (let table of tables) {
    // json 파일 fetch
    const data = await fetchJSON(table);
    // WebSQL 테이블 생성, data 추가
    createTable(table, data).then(insertData(table, data));
  }
};

const deleteTable = (tableName) => {
  if (!tableName) return '테이블 이름이 없습니다.';

  return new Promise((resolve, reject) => {
    database.transaction(
      (tx) => {
        tx.executeSql(`DROP TABLE IF EXISTS ${tableName}`);
      },
      [],
      () => {},
      () => {}
    );
  });
};

const TABLE_ARRAY = [
  'student',
  'subject',
  'professor',
  'major',
  'grade',
  'scholarship',
  'tuition',
  'mileage',
  'invalid_data',
];

initSetting(TABLE_ARRAY);

const $table = document.querySelector('.sec-result > table');
const $run_button = document.querySelector('.btn-run');

$run_button.addEventListener('click', async (e) => {
  e.preventDefault();
  clickButtonAnimation(e);

  const $editor = document.querySelector('.CodeMirror-line > span');

  const inputValue = convertToValidKey($editor.innerText);
  const data = await handleWebSQL(inputValue);
  renderTable(data);
});

/**
 * convertToValidKey()는 유효한 key값을 리턴합니다.
 * 정규표현식으로 타겟을 체크합니다.
 * (작성자: 이준근)
 * 수정 #1(김창현) - 파라미터 생성 및 스코프 분리)
 *
 * @params {textarea.value}
 * @return {string}
 */
const convertToValidKey = (value) => {
  if (!value) return null;
  const regex = /[1-4]학년[1-4]학기/gi;
  if (!regex.test(value)) return value;
  else {
    const num = {
      1: '일',
      2: '이',
      3: '삼',
      4: '사',
    };
    for (let i = 1; i < 5; i++) {
      const re = new RegExp(`${i}학년`, 'gi');
      value = value.replaceAll(re, `${num[i]}학년`);
    }
    for (let i = 1; i < 3; i++) {
      const re2 = new RegExp(`${i}학기`, 'gi');
      value = value.replaceAll(re2, `${num[i]}학기`);
    }
    return value;
  }
};

const handleWebSQL = (text) => {
  if (!text) return null;
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        text,
        [],
        (tx, result) => {
          resolve(result.rows);
        },
        () => {
          reject();
        }
      );
    });
  });
};

const cleanTable = () => {
  while ($table.firstChild) {
    $table.removeChild($table.firstChild);
  }
};

const renderTable = (data) => {
  // 예외 처리
  if (!data) return;
  // 테이블 자식 요소 제거
  cleanTable();

  // 테이블 내부 엘리먼트 생성
  const $tbody = document.createElement('tbody');

  // 효율 및 안전성을 위해 createElement 사용
  // 테이블 헤더 데이터 추가
  const $tr = document.createElement('tr');
  const obj = {
    일학년일학기: '1학년1학기',
    일학년이학기: '1학년2학기',
    이학년일학기: '2학년1학기',
    이학년이학기: '2학년2학기',
    삼학년일학기: '3학년1학기',
    삼학년이학기: '3학년2학기',
    사학년일학기: '4학년1학기',
    사학년이학기: '4학년2학기',
  };
  for (let column in data[0]) {
    const $th = document.createElement('th');
    if (column.includes('학기')) {
      $th.textContent = obj[column];
    } else {
      $th.textContent = column;
    }
    $tr.appendChild($th);
  }
  $tbody.appendChild($tr);

  // 테이블 바디 데이터 추가
  for (let row of data) {
    const $tr = document.createElement('tr');
    for (let value in row) {
      const $td = document.createElement('td');
      $td.textContent = row[value];
      $tr.appendChild($td);
    }
    $tbody.appendChild($tr);
  }

  // 테이블에 추가
  $table.appendChild($tbody);
};

// 버튼 클릭 시 애니메이션
const clickButtonAnimation = (e) => {
  const $btn = e.currentTarget;
  const $parent = document.querySelector('.btn-contain');

  const colors = ['#5866EC', '#FFD66B', '#E6E9FF'];
  let group = [];
  const num = Math.floor(Math.random() * 20) + 30;

  for (let i = 0; i < num; i++) {
    let randBG = Math.floor(Math.random() * colors.length);
    let scale = (Math.random() / 5 + 0.05).toFixed(2);
    let x = Math.floor(Math.random() * (150 + 100)) - 100;
    let y = Math.floor(Math.random() * (150 + 100)) - 100;
    let sec = Math.floor(Math.random() * 1700) + 1000;

    let shape = document.createElement('div');
    shape.classList.add('star-five');

    shape.style.top = `${$btn.offsetTop - 60}px`;
    shape.style.left = `${$btn.offsetLeft - 50}px`;
    shape.style.transform = `scale(${scale})`;
    shape.style.transition = `${sec}ms`;
    shape.style.borderBottom = `70px solid ${colors[randBG]}`;

    const before = document.createElement('div');
    const after = document.createElement('div');

    before.classList.add('star-five-before');
    before.style.borderBottom = `80px solid ${colors[randBG]}`;

    after.classList.add('star-five-after');
    after.style.borderBottom = `70px solid ${colors[randBG]}`;

    shape.appendChild(before);
    shape.appendChild(after);

    $parent.appendChild(shape);

    group.push({ shape: shape, x: x, y: y });
  }

  for (let a = 0; a < group.length; a++) {
    let shape = group[a].shape;
    let x = group[a].x;
    let y = group[a].y;

    shape.style.top = `${x + 40}px`;
    shape.style.left = `${y + 600}px`;
    shape.style.transform = `scale(0)`;
  }

  setTimeout(function () {
    for (var b = 0; b < group.length; b++) {
      var shape = group[b].shape;
      $parent.removeChild(shape);
    }
    group = [];
  }, 2000);
};
