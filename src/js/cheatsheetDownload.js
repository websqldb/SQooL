const downloadBtn = document.querySelector('.cheatsheet-download');

const downlodePdf = (filename, filepath) => {
  const element = document.createElement('a');
  element.setAttribute('href', '../../data/grade.json');
  element.setAttribute('download', 'test');
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

downloadBtn.addEventListener('click', (e) => {
  downlodePdf();
});
