// WebSQL 데이터베이스 생성
const database = openDatabase(
  'University',
  '1.0',
  'chrome dabase test',
  2 * 1024 * 1024
);

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
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS ${tableName}(${String(columns)})`,
          []
        );
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
            `INSERT INTO ${tableName}(${String(columns)}) VALUES (${String(
              substitute
            )})`,
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

// deleteTable('grade');

const arr = [
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

initSetting(arr);

const $editor = document.querySelector('.code > textarea');
const $table = document.querySelector('.sec-result > table');
const $run_button = document.querySelector('.btn-run');

$run_button.addEventListener('click', async (e) => {
  e.preventDefault();

  /**
   * convertToValidKey()는 유효한 key값을 리턴합니다.
   * 정규표현식으로 타겟을 체크합니다.
   * (작성자: 이준근)
   *
   * @params {textarea.value}
   * @return {string}
   */
  const convertToValidKey = () => {
    let inputData = $editor.value;
    const regex = /[1-4]학년[1-4]학기/gi;
    if (!regex.test(inputData)) return inputData;
    else {
      const num = {
        1: '일',
        2: '이',
        3: '삼',
        4: '사',
      };
      for (let i = 1; i < 5; i++) {
        const regex = new RegExp(`${i}학년${i}학기`, 'gi');
        inputData = inputData.replaceAll(regex, `${num[i]}학년${num[i]}학기`);
      }
      return inputData;
    }
  };
  const inputValue = convertToValidKey();
  const data = await handleWebSQL(inputValue);
  renderTable(data);
});

const handleWebSQL = (text) => {
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

if ('grade') {
}

const cleanTable = () => {
  while ($table.firstChild) {
    $table.removeChild($table.firstChild);
  }
};

const renderTable = (data) => {
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
