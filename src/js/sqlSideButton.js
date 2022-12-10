// 메인 sql more 버튼 클릭 로직
const moreBtn = document.querySelector('.more-btn');
const sqlBtnMore = document.querySelectorAll('.sql-btn-more');

moreBtn.addEventListener('click', () => {
  const isHidden = sqlBtnMore[0].className.includes('sr-only');

  if (isHidden) {
    sqlBtnMore.forEach((sqlBtn) => {
      sqlBtn.classList.remove('sr-only');
    });
  } else {
    sqlBtnMore.forEach((sqlBtn) => {
      sqlBtn.classList.add('sr-only');
    });
  }
});
