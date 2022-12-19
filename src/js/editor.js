// 등록된 모든 사이드 sql 버튼에 대한 sql 기본 입력 구문 작성(sql 구문이 고정되면 추가 예정, 현재 기능만 )
const addStatement = (sqlSyntax) => {
  const DEFAULT_SQL_VALUES = {
    SELECT: `SELECT * FROM table_name;`,
    GROUP_BY: `SELECT column_name(s)\nFROM table_name\nGROUP BY column_name(s);`,
    ORDER_BY: `SELECT * FROM table_name\nORDER BY column1, column2, ... ASC|DESC;`,
    UPDATE: `UPDATE table_name\nSET column1 = value1, column2 = value2, ...\nWHERE condition;`,
    INSERT_INTO: `INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);`,
    WHERE: `SELECT * FROM table_name
WHERE condition;`,
    DELETE: `DELETE FROM table_name WHERE condition;`,
    INNER_JOIN: `SELECT column_name(s) FROM table1\nINNER JOIN table2\nON table1.column_name = table2.column_name;`,
    INSERT_INTO_SELECT: `INSERT INTO table2
SELECT * FROM table1
WHERE condition;`,
    LIMIT: `SELECT * FROM table_name
LIMIT rows;`,
    AND: `SELECT column1, column2
FROM table_name
WHERE condition1 AND condition2 AND condition3;`,
    OR: `SELECT column1, column2
FROM table_name
WHERE condition1 OR condition2 OR condition3;`,
    NOT: `SELECT column1, column2
FROM table_name
WHERE NOT condition;`,
    IS_NULL: `SELECT column_names
FROM table_name
WHERE column_name IS NULL;`,
    IS_NOT_NULL: `SELECT column_names
FROM table_name
WHERE column_name IS NOT NULL;`,
    IN: `SELECT column_name(s)
FROM table_name
WHERE column_name IN (value1, value2, ...);`,
    BETWEEN: `SELECT column_name(s)
FROM table_name
WHERE column_name BETWEEN value1 AND value2;`,
    COUNT: `SELECT COUNT(column_name)
FROM table_name
WHERE condition;`,
    SUM: `SELECT SUM(column_name)
FROM table_name
WHERE condition;`,
    MIN: `SELECT MIN(column_name)
FROM table_name
WHERE condition;`,
    MAX: `SELECT MAX(column_name)
FROM table_name
WHERE condition;`,
    AVG: `SELECT AVG(column_name)
FROM table_name
WHERE condition;`,
    AS: `SELECT column_name AS alias_name
FROM table_name;`,
    HAVING: `SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s)
HAVING condition
ORDER BY column_name(s);`,
    CASE: `CASE
  WHEN condition1 THEN result1
  WHEN condition2 THEN result2
  WHEN condition3 THEN resultN
  ELSE result
END;`,
    DISTINCT: `SELECT DISTINCT columnn1, column2, ...
FROM table_name;`,
    LEFT_JOIN: `SELECT column_name(s)
FROM table1
LEFT JOIN table2
ON table1.column_name = table2.column_name;`,
    RIGHT_JOIN: `SELECT column_name(s)
FROM table1
RIGHT JOIN table2
ON table1.column_name = table2.column_name;`,
    FULL_OUTER_JOIN: `SELECT column_name(s)
FROM table1
FULL OUTER JOIN table2
ON table1.column_name = table2.column_name
WHERE condition;`,
    UNION: `SELECT column_name(s) FROM table1
UNION 
SELECT column_name(s) FROM table2;`,
    UNION_ALL: `SELECT column_name(s) FROM table1
UNION ALL
SELECT column_name(s) FROM table2;`,
    EXISTS: `SELECT column_name(s)
FROM table_name
WHERE EXISTS
(SELECT column_name FROM table_name WHERE condition);`,
    ANY: `SELECT column_name(s)
FROM table_name
WHERE column_name operatoor ANY
  (SELECT column_name
  FROM table_name
  WHERE condition);`,
    ALL: `SELECT ALL column_name(s)
FROM table_name
WHERE condition;`,
    SELECT_INTO: `SELECT column1 INTO column2\nFROM table_name\nWHERE condition;`,
  };
  window.editor.setValue(DEFAULT_SQL_VALUES[sqlSyntax] || sqlSyntax);
};

const AUTOCOMPLETE_TABLES = {
  department: ["학과번호", "학과이름", "학과담당자", "학과전화번호"],
  grade: ["학번", "학기", "평균학점"],
  mileage: ["연도", "금액(1마일리지)"],
  professor: [
    "교원번호",
    "이름",
    "학과",
    "이메일",
    "연구실전화번호",
    "생년월일",
    "연구실",
  ],
  scholarship: ["학번", "성적장학금", "근로장학금", "국가장학금"],
  ["school expenses"]: ["연도", "금액"],
  student: [
    "학번",
    "이름",
    "학과",
    "지도교수",
    "학년",
    "생년월일",
    "연락처",
    "주소",
    "마일리지",
  ],
  subject: [
    "과목",
    "번호",
    "교수번호",
    "학과번호",
    "과목명",
    "전필/전선/교양",
    "학점",
  ],
};

window.onload = function codemirroreditor() {
  window.editor = CodeMirror.fromTextArea(
    document.getElementById("codeeditor"),
    {
      mode: "text/x-sqlite",
      indentWithTabs: true,
      smartIndent: true,
      lineNumbers: true,
      matchBrackets: true,
      autofocus: true,
      extraKeys: { Tab: "autocomplete" },
    }
  );
  window.editor.setValue("SELECT * FROM Student;");

  CodeMirror.commands.autocomplete = function (cm) {
    CodeMirror.showHint(cm, CodeMirror.hint.sql, {
      tables: AUTOCOMPLETE_TABLES,
    });
  };

  // 탭 누르지 않고 바로 실행되도록 설정
  window.editor.on("keydown", function (cm, event) {
    // a ~ z
    // 1 ~ F12
    // delete ~ 9
    if (
      (!event.ctrlKey && event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 97 && event.keyCode <= 122) ||
      (event.keyCode >= 46 && event.keyCode <= 57)
    ) {
      CodeMirror.commands.autocomplete(cm, null, { completeSingle: false });
    }
  });

  // const $mainStatementClipboard = document.querySelector(".CodeMirror");
  const $mainStatementBtn = document.querySelector(".btn-copy");

  $mainStatementBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // const $mainStatementCodeLine = document.querySelector(".CodeMirror-line");
    const $mainStatementCodeLine =
      document.querySelectorAll(".CodeMirror-line");
    let codeTxt = "";
    $mainStatementCodeLine.forEach((i) => (codeTxt += i.textContent + "\n"));
    window.navigator.clipboard.writeText(codeTxt).then(() => {
      // alert("복사완료");
      toast();
    });
  });
};

function toast() {
  const $toastClipBoard = document.querySelector("#toastClipBoard");
  $toastClipBoard.classList.contains("reveal")
    ? (clearTimeout(removeToast),
      (removeToast = setTimeout(function () {
        $toastClipBoard.classList.remove("reveal");
      }, 1000)))
    : (removeToast = setTimeout(function () {
        $toastClipBoard.classList.remove("reveal");
      }, 1000));
  $toastClipBoard.classList.add("reveal");
}

const sqlBtnItems = document.querySelector(".sql-btn-item");

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
