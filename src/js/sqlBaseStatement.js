const sqlBtnItems = document.querySelector(".sql-btn-item");
const sqlSelect = document.querySelector("#sqlSelect");
const codeLine = document.querySelector(".code > textarea");

// pre 태그 줄바꿈 인식
codeLine.style.whiteSpace = "pre-wrap";

// 등록된 모든 사이드 sql 버튼에 대한 sql 기본 입력 구문 작성(sql 구문이 고정되면 추가 예정, 현재 기능만 )
const addStatement = (sqlSyntax) => {
  let statement = "";
  switch (sqlSyntax) {
    case "SELECT":
      statement = `SELECT * FROM table_name;`;
      break;
    case "GROUP_BY":
      statement = `SELECT column_name(s)
FROM table_name
GROUP BY column_name(s)`;
      break;
    case "ORDER_BY":
      statement = `SELECT * FROM table_name
ORDER BY column1, column2, ... ASC|DESC;;
      `;
      break;
    case "UPDATE":
      statement = `UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;`;
      break;
    case "INSERT_INTO":
      statement = `INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);`;
      break;
    case "WHERE":
      statement = `SELECT * FROM table_name
WHERE condition;`;
      break;
    case "DELETE":
      statement = `DELETE FROM table_name WHERE condition;`;
      break;
    case "INNER_JOIN":
      statement = `SELECT column_name(s) FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;`;
      break;
    case "INSERT_INTO_SELECT":
      statement = `INSERT INTO table2
SELECT * FROM table1
WHERE condition;`;
      break;
    case "LIMIT":
      statement = `SELECT * FROM table_name
LIMIT rows;`;
      break;
    case "AND":
      statement = `SELECT column1, column2
FROM table_name
WHERE condition1 AND condition2 AND condition3;`;
      break;
    case "OR":
      statement = `SELECT column1, column2
FROM table_name
WHERE condition1 OR condition2 OR condition3;`;
      break;
    case "NOT":
      statement = `SELECT column1, column2
FROM table_name
WHERE NOT condition;`;
      break;
    case "IS_NULL":
      statement = `SELECT column_names
FROM table_name
WHERE column_name IS NULL;`;
      break;
    case "IS_NOT_NULL":
      statement = `SELECT column_names
FROM table_name
WHERE column_name IS NOT NULL;`;
      break;
    case "IN":
      statement = `SELECT column_name(s)
FROM table_name
WHERE column_name IN (value1, value2, ...);`;
      break;
    case "BETWEEN":
      statement = `SELECT column_name(s)
FROM table_name
WHERE column_name BETWEEN value1 AND value2;`;
      break;
    case "COUNT":
      statement = `SELECT COUNT(column_name)
FROM table_name
WHERE condition;`;
      break;
    case "SUM":
      statement = `SELECT SUM(column_name)
FROM table_name
WHERE condition;`;
      break;
    case "MIN":
      statement = `SELECT MIN(column_name)
FROM table_name
WHERE condition;`;
      break;
    case "MAX":
      statement = `SELECT MAX(column_name)
FROM table_name
WHERE condition;`;
      break;
    case "AVG":
      statement = `SELECT AVG(column_name)
FROM table_name
WHERE condition;`;
      break;
    case "AS":
      statement = `SELECT column_name AS alias_name
FROM table_name;`;
      break;
    case "HAVING":
      statement = `SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s)
HAVING condition
ORDER BY column_name(s);`;
      break;
    case "CASE":
      statement = `CASE
  WHEN condition1 THEN result1
  WHEN condition2 THEN result2
  WHEN condition3 THEN resultN
  ELSE result
END;`;
      break;
    case "DISTINCT":
      statement = `SELECT DISTINCT columnn1, column2, ...
FROM table_name;`;
      break;
    case "LEFT_JOIN":
      statement = `SELECT column_name(s)
FROM table1
LEFT JOIN table2
ON table1.column_name = table2.column_name;`;
      break;
    case "RIGHT_JOIN":
      statement = `SELECT column_name(s)
FROM table1
RIGTH JOIN table2
ON table1.column_name = table2.column_name;`;
      break;
    case "FULL_OUTER_JOIN":
      statement = `SELECT column_name(s)
FROM table1
FULL OUTER JOIN table2
ON table1.column_name = table2.column_name
WHERE condition;`;
      break;
    case "UNION":
      statement = `SELECT column_name(s) FROM table1
UNION 
SELECT column_name(s) FROM table2;`;
      break;
    case "UNION_ALL":
      statement = `SELECT column_name(s) FROM table1
UNION ALL
SELECT column_name(s) FROM table2;`;
      break;
    case "EXISTS":
      statement = `SELECT column_name(s)
FROM table_name
WHERE EXISTS
(SELECT column_name FROM table_name WHERE condition);`;
      break;
    case "ANY":
      statement = `SELECT column_name(s)
FROM table_name
WHERE column_name operatoor ANY
  (SELECT column_name
  FROM table_name
  WHERE condition);`;
      break;
    case "ALL":
      statement = `SELECT ALL column_name(s)
FROM table_name
WHERE condition;`;
      break;
    case "SELECT_INTO":
      statement = `SELECT column1 INTO column2 
FROM table_name 
WHERE condition;`;
      break;
    default:
      statement;
  }

  codeLine.innerHTML = statement;
};

// 사이드 select option 선택 시 sql statement에 기본 구문 출력
sqlSelect.addEventListener("change", (e) => {
  addStatement(e.target.value);
});

// 사이드 버튼 클릭 시 sql statement에 기본 구문 출력
sqlBtnItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("sql-btn")) {
    const sqlBtn = e.target;
    addStatement(sqlBtn.dataset.sql);
  }
});
