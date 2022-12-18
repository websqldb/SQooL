const downloadBtn = document.querySelector('.cheatsheet-download');

// const createDownloadTag = () => {
//   const element = document.createElement('a');
//   element.setAttribute('href', '../../data/grade.json');
//   element.setAttribute('download', 'test');
//   element.style.width = '15px';
//   element.style.height = '15px';
//   element.style.position = 'absoulte';
//   element.style.left = '0';
//   element.style.top = '0';
//   element.style.display = 'block';
//   downloadBtn.appendChild(element);
// };

// createDownloadTag();

// test
// pdf 파일 제작완료 후 파일경로 변경 예정
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
