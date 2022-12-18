const downloadBtn = document.querySelector('.cheatsheet-download');

const element = document.createElement('a');
const makeA = () => {
  element.setAttribute('href', '../../data/grade.json');
  element.setAttribute('download', 'test');
  element.style.width = '15px';
  element.style.height = '15px';
  element.style.position = 'absoulte';
  element.style.left = '0';
  element.style.top = '0';
  element.style.display = 'block';
  downloadBtn.appendChild(element);
};

makeA();

downloadBtn.addEventListener('click', (e) => {
  // e.preventDefault();
  // element.click();
  console.log('click');
  // downloadBtn.removeChild(element);
});
