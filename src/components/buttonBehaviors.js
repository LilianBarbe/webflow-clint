// // BUTTON ANIM
export function applyButtonsBehav() {
  const btns = document.querySelectorAll(".btn_main_wrap");

  btns.forEach((button) => {
    button.addEventListener("mouseenter", function (e) {
      var x = e.clientX - button.getBoundingClientRect().left;
      var y = e.clientY - button.getBoundingClientRect().top;
      var span = button.querySelector("span");
      span.style.top = y + "px";
      span.style.left = x + "px";
    });

    button.addEventListener("mouseout", function (e) {
      var x = e.clientX - button.getBoundingClientRect().left;
      var y = e.clientY - button.getBoundingClientRect().top;
      var span = button.querySelector("span");
      span.style.top = y + "px";
      span.style.left = x + "px";
    });
  });
}
