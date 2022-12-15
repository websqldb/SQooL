var AUTOCOMPLETE_TABLES = {
  hello: ["world", "neighbor", "there"],
  reply: ["rumble", "hellodley", "hi_there"],
};
let defaultValue = "SELECT * FROM Student";

window.onload = function () {
  window.editor = CodeMirror.fromTextArea(
    document.getElementById("codeeditor"),
    {
      mode: "text/x-sql",
      indentWithTabs: true,
      smartIndent: true,
      lineNumbers: true,
      matchBrackets: true,
      autofocus: true,
      extraKeys: { Tab: "autocomplete" },
    }
  );

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

  window.editor.setValue(defaultValue);
  /*
  CodeMirror.commands.autocomplete = function (cm) {
    CodeMirror.showHint(cm, CodeMirror.hint.sql, {
      tables: AUTOCOMPLETE_TABLES,
    });
  };
*/
  // 탭 누르지 않고 바로 실행되도록 설정
  window.editor.on("keyup", function (cm, event) {
    if (
      !cm.state.completionActive &&
      event.keyCode != 13 &&
      event.keyCode != 48
    ) {
      CodeMirror.commands.autocomplete(cm, null, { completeSingle: false });
    }
  });
};
