const $body = document.querySelector('body');
const $switchBtn = $body.querySelector('.btn-darkmode');

let darkMode = localStorage.getItem('darkMode');

function toggleON() {
  const $sideBar = $body.querySelector('.side-bar');
  const $header = $body.querySelector('.global-header');
  const $main = $body.querySelector('main');
  const $footer = $body.querySelector('.sql-footer');
  const $sqlBtnWrap = $sideBar.querySelector('.sql-btn-wrap');
  // sql-btn-wrap sideBar=> body로 수정 가넝?

  $body.classList.add('dark-mode');
  $sideBar.classList.add('dark-mode');
  $header.classList.add('dark-mode');
  $switchBtn.classList.add('dark-mode');
  $main.classList.add('dark-mode');
  $footer.classList.add('dark-mode');
  $sqlBtnWrap.classList.add('dark-mode');
}

function toggleOff() {
  const $sideBar = $body.querySelector('.side-bar');
  const $header = $body.querySelector('.global-header');
  const $main = $body.querySelector('main');
  const $footer = $body.querySelector('.sql-footer');
  const $sqlBtnWrap = $sideBar.querySelector('.sql-btn-wrap');
  // sql-btn-wrap sideBar=> body로 수정 가넝?

  $body.classList.remove('dark-mode');
  $sideBar.classList.remove('dark-mode');
  $header.classList.remove('dark-mode');
  $switchBtn.classList.remove('dark-mode');
  $main.classList.remove('dark-mode');
  // 메인-에디터 팀에서 다크모드 적었습니다.
  $footer.classList.remove('dark-mode');
  $sqlBtnWrap.classList.remove('dark-mode');
}

$switchBtn.addEventListener('click', Darkmode);

const enableDarkMode = () => {
  localStorage.setItem('darkMode', 'enabled');
  toggleON();
};

const disableDarkMode = () => {
  document.body.classList.remove('dark-mode');
  localStorage.setItem('darkMode', null);
  toggleOff();
};

if (darkMode === 'enabled') enableDarkMode();

function Darkmode() {
  // 클릭 시마다 초기화
  darkMode = localStorage.getItem('darkMode');
  if (darkMode !== 'enabled') {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
}