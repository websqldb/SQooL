CodeMirror.commands.autocomplete = function (cm) {
  CodeMirror.showHint(cm, CodeMirror.hint.html);
};
window.onload = function () {
  editor = CodeMirror(document.getElementById("codeeditor"), {
    mode: "sql",
    theme: "default",
    lineWrapping: true,
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,

    extraKeys: {
      "Ctrl-Space": "autocomplete",
    },
    // 기본값
    value: "SELECT * FROM WORLD;",
  });
};
