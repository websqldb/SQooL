const sidebarList = document.querySelectorAll(".list-item li");
const sectionList = document.querySelectorAll(".cheatsheet-list");

sidebarList.forEach((item, i) => {
  item.addEventListener("click", () => {
    const sectionTop = sectionList[i].offsetTop;

    window.scrollTo({ top: sectionTop - 100, left: 0, behavior: "smooth" });
  });
});
