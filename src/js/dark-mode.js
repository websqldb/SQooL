const $body = document.querySelector('body');
const $switchBtn = $body.querySelector('.btn-darkmode');

let darkMode = localStorage.getItem('darkMode');
function toggleON() {
  const $sideBar = $body.querySelector('.side-bar');
  const $header = $body.querySelector('.global-header');
  const $main = $body.querySelector('main');
  // 메인-에디터 팀에서 다크모드 적었습니다.
  const $editor_1 = $body.querySelector('.cm-keyword');
  const $editor_2 = $body.querySelector('.cm-s-default');

  const $footer = $body.querySelector('.sql-footer');
  const $sqlBtnWrap = $sideBar.querySelector('.sql-btn-wrap');
  // sql-btn-wrap sideBar=> body로 수정 가넝?

  $body.classList.add('dark-mode');
  $sideBar.classList.add('dark-mode');
  $header.classList.add('dark-mode');
  $switchBtn.classList.add('dark-mode');
  $main.classList.add('dark-mode');
  // 메인-에디터 팀에서 다크모드 적었습니다.
  $footer.classList.add('dark-mode');
  $editor_1.classList.add('dark-mode');
  $editor_2.classList.add('dark-mode');
  $sqlBtnWrap.classList.add('dark-mode');
}

function toggleOff() {
  const $sideBar = $body.querySelector('.side-bar');
  const $header = $body.querySelector('.global-header');
  const $main = $body.querySelector('main');
  // 메인-에디터 팀에서 다크모드 적었습니다.
  const $editor_1 = $body.querySelector('.cm-keyword');
  const $editor_2 = $body.querySelector('.cm-s-default');

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
  $editor_1.classList.remove('dark-mode');
  $editor_2.classList.remove('dark-mode');
  $sqlBtnWrap.classList.remove('dark-mode');
}

$switchBtn.addEventListener('click', Darkmode);

/* 주석, 없는 엘리먼트 */
// const darkModeToggle = document.querySelector('#darkModeToggle');

const enableDarkMode = () => {
  // body 태그에 다크모드 클래스 추가
  // document.body.classList.add("dark-mode");
  // 로컬스토리지에 다크모드 키-값 생성
  localStorage.setItem('darkMode', 'enabled');
  toggleON();
};

const disableDarkMode = () => {
  // body 태그에 다크모드 클래스 제거
  document.body.classList.remove('dark-mode');
  // 로컬스토리지에 다크모드 키의 값을 null로 업데이트
  localStorage.setItem('darkMode', null);
  toggleOff();
};

if (darkMode === 'enabled') enableDarkMode();

function Darkmode() {
  // 클릭 시마다 초기화
  darkMode = localStorage.getItem('darkMode');
  // 만약 다크모드가 활성화 되어 있지 않다면
  if (darkMode !== 'enabled') {
    // 다크모드 활성화 함수 호출
    enableDarkMode();
    /* 주석, 없는 엘리먼트 */
    // darkModeToggle.textContent = "다크모드 비활성화";
  } else {
    // 그렇지 않다면(활성화 되어 있다면) 비활성화 함수 호출
    disableDarkMode();
    /* 주석, 없는 엘리먼트 */
    // darkModeToggle.textContent = "다크모드 활성화";
  }
}
