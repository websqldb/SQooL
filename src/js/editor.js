var AUTOCOMPLETE_TABLES = {
<<<<<<< HEAD
  hello: ['world', 'neighbor', 'there'],
  reply: ['rumble', 'hellodley', 'hi_there', 'aggregate'],
};


=======
  department: ['학과번호', '학과이름', '학과담당자', '학과전화번호'],
  grade: ['학번', '학기', '평균학점'],
  mileage: ['연도', '금액(1마일리지)'],
  professor: [
    '교원번호',
    '이름',
    '학과',
    '이메일',
    '연구실전화번호',
    '생년월일',
    '연구실',
  ],
  scholarship: ['학번', '성적장학금', '근로장학금', '국가장학금'],
  ['school expenses']: ['연도', '금액'],
  student: [
    '학번',
    '이름',
    '학과',
    '지도교수',
    '학년',
    '생년월일',
    '연락처',
    '주소',
    '마일리지',
  ],
  subject: [
    '과목',
    '번호',
    '교수번호',
    '학과번호',
    '과목명',
    '전필/전선/교양',
    '학점',
  ],
};
let defaultValue = 'SELECT * FROM Student';
>>>>>>> 98e53458a70ce068f18b15ad8e40a07c9cfbda00

window.onload = function () {
  window.editor = CodeMirror.fromTextArea(
    document.getElementById('codeeditor'),
    {
      mode: 'text/x-sql',
      indentWithTabs: true,
      smartIndent: true,
      lineNumbers: true,
      matchBrackets: true,
      autofocus: true,
      extraKeys: { Tab: 'autocomplete' },
    }
  );
  window.editor.setValue(defaultValue);

  CodeMirror.commands.autocomplete = function (cm) {
    CodeMirror.showHint(cm, CodeMirror.hint.sql, {
      tables: AUTOCOMPLETE_TABLES,
    });
  };

  // 탭 누르지 않고 바로 실행되도록 설정
  window.editor.on('keydown', function (cm, event) {
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
};
