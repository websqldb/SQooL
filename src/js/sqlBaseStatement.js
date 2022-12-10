const sqlBtns = document.querySelectorAll('.sql-btn');
const codeLine = document.querySelector('.code-line');

// pre 태그 줄바꿈 인식
codeLine.style.whiteSpace = 'pre-wrap';

// 등록된 모든 사이드 sql 버튼에 대한 sql 기본 입력 구문 작성(sql 구문이 고정되면 추가 예정, 현재 기능만 )
const addStatement = (sqlBtn) => {
  let statement = '';
  switch (sqlBtn.dataset.sql) {
    case 'SELECT':
      statement = `SELECT * FROM table_name;`;
      break;
    case 'GROUP_BY':
      statement = `SELECT column_name(s)
FROM table_name
GROUP BY column_name(s)`;
      break;
    case 'ORDER_BY':
      statement = `SELECT * FROM table_name
ORDER BY column1, column2, ... ASC|DESC;;
      `;
      break;
    case 'UPDATE':
      statement = `UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;`;
      break;
    case 'INSERT_INTO':
      statement = `INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);`;
      break;
    case 'WHERE':
      statement = `SELECT * FROM table_name
WHERE condition;`;
      break;
    case 'DELETE':
      statement = `DELETE FROM table_name WHERE condition;`;
      break;
    case 'INNER_JOIN':
      statement = `SELECT column_name(s) FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;`;
      break;
    case 'INSERT_INTO_SELECT':
      statement = `INSERT INTO table2
SELECT * FROM table1
WHERE condition;`;
      break;
    default:
      statement;
  }

  codeLine.innerHTML = statement;
};

// 사이드 버튼에 이벤트 추가
sqlBtns.forEach((sqlBtn) => {
  sqlBtn.addEventListener('click', () => addStatement(sqlBtn));
});
