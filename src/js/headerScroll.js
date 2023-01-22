let prevScrollpos = window.pageYOffset;
const header = document.querySelector(".global-header");

window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    header.style.top = "0";
  } else {
    header.style.top = "-80px";
  }
  prevScrollpos = currentScrollPos;
};
