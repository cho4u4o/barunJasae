document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  menuToggle.addEventListener("click", function () {
    if (menu.classList.contains("show")) {
      menu.classList.remove("show");
      setTimeout(() => {
        menu.style.display = "none";
      }, 300); // Match this duration with the CSS transition duration
    } else {
      menu.style.display = "flex";
      setTimeout(() => {
        menu.classList.add("show");
      }, 10); // Slight delay to allow for reflow
    }
  });
});
