const $laWrap = document.querySelector(".la-wrap");
let activeIndex = 1;
const clickModalNextBtn = () => {
  const $modalWrap = document.querySelector(".modal-wrap");
  const $modalOverlay = document.querySelector(".modal-overlay");
  const $modalMain = $modalWrap.querySelector(".modal-main");

  const $modalTitle = $modalWrap.querySelector("h2");
  const $modalDesc = $modalWrap.querySelector("p");
  const $modalIndex = $modalWrap.querySelector("span");
  const $modalBtn = $modalWrap.querySelector(".btn-next");

  if (activeIndex < 3) {
    if (activeIndex === 0) {
      $modalTitle.innerText = `SQL Statement 사용 방법`;
      $modalDesc.innerText = `
      SQL 구문이 담긴 태그 버튼을 클릭하면 예시 구문을 불러올 수 있습니다.
      `;
      $modalIndex.innerText = `1/3`;
      $modalBtn.innerText = "다음";
      $modalMain.classList.remove("hint1");
      $modalMain.classList.add("hint2");
    } else if (activeIndex === 1) {
      $modalTitle.innerText = `Run SQL 버튼에 대한 설명`;
      $modalDesc.innerText = `
      에디터에 SQL 구문을 입력하고 Run SQL 버튼을 클릭하면 하단에 결과가
      나타납니다.
      `;
      $modalMain.classList.remove("hint1");
      $modalMain.classList.add("hint2");
      $modalIndex.innerText = `2/3`;

      $modalMain.style.top = "407px";
      $modalMain.style.left = "700px";
    } else if (activeIndex === 2) {
      $modalTitle.innerText = `Database 다운로드에 대한 설명`;
      $modalDesc.innerText = `
      데이터를 .csv나 .json 파일로 다운로드하여 사용할 수 있습니다.
      `;
      $modalMain.classList.remove("hint2");
      $modalMain.classList.add("hint3");
      $modalWrap.style.zIndex = 10;
      $modalMain.style.top = "500px";
      $modalMain.style.left = "91px";
      $modalIndex.innerText = `3/3`;
      $modalBtn.innerText = `튜토리얼 끝내기`;
      window.scrollTo(0, 400);
    }

    activeIndex++;
  } else {
    // 모달 삭제
    document.body.style.overflow = "visible";
    $modalWrap.removeChild($modalOverlay);
    $modalWrap.remove();
    activeIndex = 1;
  }
};

const showMainModal = (e) => {
  e.preventDefault();

  document.body.style.overflow = "hidden";

  const $modalWrap = document.createElement("div");
  $modalWrap.classList.add("modal-wrap");
  const $modalOverlay = document.createElement("div");
  $modalOverlay.classList.add("modal-overlay");
  const $modalMain = document.createElement("div");
  $modalMain.classList.add("modal-main");
  $modalMain.classList.add("hint1");
  const $modalTitle = document.createElement("h2");
  $modalTitle.classList.add("sr-only");
  $modalTitle.innerText = `SQL Statement 사용 방법`;
  const $modalDesc = document.createElement("p");
  $modalDesc.innerText = `
  SQL 구문이 담긴 태그 버튼을 클릭하면 예시 구문을 불러올 수 있습니다.
  `;

  const $modalContent = document.createElement("div");
  $modalContent.classList.add("modal-content");
  const $modalIndex = document.createElement("span");
  $modalIndex.innerText = `1/3`;

  const $modalBtn = document.createElement("button");
  $modalBtn.classList.add("btn-next");
  $modalBtn.type = "button";
  $modalBtn.innerText = `다음`;

  $modalBtn.addEventListener("click", clickModalNextBtn);

  $modalContent.append($modalIndex, $modalBtn);
  $modalMain.append($modalTitle, $modalDesc, $modalContent);
  $modalOverlay.append($modalMain);
  $modalWrap.append($modalOverlay);

  $laWrap.append($modalWrap);

  $modalMain.style.top = "233px";
  $modalMain.style.left = "300px";
  $modalBtn.focus();
};

const showCheatModal = (e) => {
  e.preventDefault();
  const $modalWrap = document.createElement("div");
  $modalWrap.classList.add("modal-wrap");
  const $modalOverlay = document.createElement("div");
  $modalOverlay.classList.add("modal-overlay");
  const $modalMain = document.createElement("div");
  $modalMain.classList.add("modal-main");
  $modalMain.classList.add("hint1");
  const $modalTitle = document.createElement("h2");
  $modalTitle.classList.add("sr-only");
  $modalTitle.innerText = `SQL CheatSheet 사용 방법`;
  const $modalDesc = document.createElement("p");
  $modalDesc.innerText = `사용 빈도가 높은 명령이나 기능들을
  찾기 쉽게 정리한 페이지입니다.

  t - 데이터 표 테이블을 의미합니다. 
  c1 - 테이블의 첫번째 칼럼을 의미합니다. 
  c2 - 테이블의 두번째 칼럼을 의미합니다.`;
  $modalMain.style.width = "411px";
  $modalDesc.style.margin = "0px";
  $modalMain.style.top = "134px";
  $modalMain.style.left = "788px";
  document.body.style.overflow = "hidden";
  $modalMain.append($modalTitle, $modalDesc);
  $modalOverlay.append($modalMain);
  $modalWrap.append($modalOverlay);

  $laWrap.append($modalWrap);
  $modalWrap.addEventListener("click", hideCheatModal);
};

// 치트시트 모달 숨기기
const hideCheatModal = () => {
  if (event.target.classList.contains("modal-wrap")) {
    const $modalOverlay = document.querySelector(".modal-overlay");
    // 삭제하기
    document.body.style.overflow = "visible";
    event.target.removeChild($modalOverlay);
    event.target.remove();
  }
};

if (window.location.pathname === "/") {
  const $btnQuestion = document.querySelector(".btn-question");
  $btnQuestion.addEventListener("click", showMainModal);
} else if (window.location.pathname === "/pagecheatsheet/") {
  const $BtnCheatQuestion = document.querySelector(".cheatsheet-modal-btn");
  $BtnCheatQuestion.addEventListener("click", showCheatModal);
}
