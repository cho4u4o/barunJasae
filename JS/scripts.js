// 모바일 화면 적응형 메뉴바

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  menuToggle.addEventListener("click", function () {
    if (menu.classList.contains("show")) {
      menu.classList.remove("show");
      setTimeout(() => {
        menu.style.display = "none";
      }, 300);
    } else {
      menu.style.display = "flex";
      setTimeout(() => {
        menu.classList.add("show");
      }, 10);
    }
  });
});
