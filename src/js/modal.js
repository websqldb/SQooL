const $btnQuestion = document.querySelector('.btn-question')
const $laWrap = document.querySelector('.la-wrap');
let activeIndex = 1;

const clickModalNextBtn = ()=>{
  const $modalWrap = document.querySelector('.modal-wrap');
  const $modalMain = $modalWrap.querySelector('.modal-main');
  
  const $modalTitle = $modalWrap.querySelector('h2');
  const $modalDesc = $modalWrap.querySelector('p');
  const $modalIndex = $modalWrap.querySelector('span');
  const $modalBtn = $modalWrap.querySelector('.btn-next');
  
  if(activeIndex < 3){
   
    if(activeIndex===0){
      $modalTitle.innerText = `SQL Statement 사용 방법`
      $modalDesc.innerText = `
      SQL 구문이 담긴 태그 버튼을 클릭하면 예시 구문을 불러올 수 있습니다.
      `
      $modalIndex.innerText = `1/3`
      $modalBtn.innerText = '다음'
      $modalMain.classList.remove('hint1')
      $modalMain.classList.add('hint2')
      
    } else if (activeIndex===1) {
      $modalTitle.innerText = `Run SQL 버튼에 대한 설명`
      $modalDesc.innerText = `
      에디터에 SQL 구문을 입력하고 Run SQL 버튼을 클릭하면 하단에 결과가
      나타납니다.
      `
      $modalMain.classList.remove('hint1');
      $modalMain.classList.add('hint2');
      $modalIndex.innerText = `2/3`

      $modalMain.style.top = '440px';
      $modalMain.style.left = '1200px';
    } else if (activeIndex===2) {
      $modalTitle.innerText = `Database 다운로드에 대한 설명`
      $modalDesc.innerText = `
      데이터를 .csv나 .json 파일로 다운로드하여 사용할 수 있습니다.
      `
      $modalMain.classList.remove('hint2');
      $modalMain.classList.add('hint3');
      $modalMain.style.top = '1000px'
      $modalMain.style.left = '560px'

      $modalIndex.innerText = `3/3`
      $modalBtn.innerText = `튜토리얼 끝내기`
    }
    
    activeIndex++;

  } else{
    // 모달 삭제
    $modalWrap.removeChild($modalMain);
    $modalWrap.remove();
    activeIndex = 1;
  }
}


const showMainModal = (e)=>{
  e.preventDefault();

  const $modalWrap = document.createElement('div');
  $modalWrap.classList.add('modal-wrap')
  const $modalMain = document.createElement('div')
  $modalMain.classList.add('modal-main')
  $modalMain.classList.add('hint1')
  const $modalTitle = document.createElement('h2')
  $modalTitle.classList.add('sr-only');
  $modalTitle.innerText = `SQL Statement 사용 방법`;
  const $modalDesc = document.createElement('p')
  $modalDesc.innerText = `
  SQL 구문이 담긴 태그 버튼을 클릭하면 예시 구문을 불러올 수 있습니다.
  `
  
  const $modalContent = document.createElement('div');
  $modalContent.classList.add('modal-content')
  const $modalIndex = document.createElement('span');
  $modalIndex.innerText = `1/3`;

  const $modalBtn = document.createElement('button');
  $modalBtn.classList.add('btn-next');
  $modalBtn.type = 'button';
  $modalBtn.innerText = `다음`;
  
  $modalBtn.addEventListener('click', clickModalNextBtn);
  
  $modalContent.append($modalIndex, $modalBtn)
  $modalMain.append($modalTitle, $modalDesc, $modalContent)
  $modalWrap.append($modalMain)
  
  $laWrap.append($modalWrap)

  $modalMain.style.top = '249px'
  $modalMain.style.left = '780px'
}

$btnQuestion.addEventListener('click',showMainModal)