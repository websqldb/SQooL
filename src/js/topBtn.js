const $topBtn = document.querySelector(".top-button");

$topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
