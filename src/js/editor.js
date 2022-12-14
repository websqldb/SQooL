var AUTOCOMPLETE_TABLES = {
  'hello': ['world', 'neighbor', 'there'],
  'reply': ['rumble', 'hellodley', 'hi_there']
  }
  window.onload = function() {

  window.editor = CodeMirror.fromTextArea(document.getElementById('codeeditor'), {
    mode: 'text/x-sql',
    indentWithTabs: true,
    smartIndent: true,
    lineNumbers: true,
    matchBrackets : true,
    autofocus: true,
    extraKeys: {"Enter": "autocomplete"}
  });

  CodeMirror.commands.autocomplete = function(cm) {
    CodeMirror.showHint(cm, CodeMirror.hint.sql, {
        tables: AUTOCOMPLETE_TABLES
    });
  }
  };