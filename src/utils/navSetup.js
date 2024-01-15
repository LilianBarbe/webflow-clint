import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { lenis } from "../utils/lenisSetup.js";

let lastScrollTop = 0;
const navWrap = document.querySelector(".nav_wrap");
const navBtnChange = document.querySelector(".nav_btn_change");
const navHeight = navWrap.offsetHeight;
const menuBtnMobile = document.querySelector(".nav_menu_icon");
const menuMobile = document.querySelector("[menu-links]");

$(window).on("resize", function () {
  var win = $(this); // ceci fait référence à la fenêtre
  if (win.width() <= 991) {
    const showMenuMobile = gsap.timeline({ paused: true });
    showMenuMobile.set(menuMobile, { display: "flex" });
    showMenuMobile.from(menuMobile, { x: "100%" });
    showMenuMobile.from(menuMobile.children, { opacity: 0, stagger: 0.2 }, 0.2);
    menuBtnMobile.addEventListener("click", function () {
      if (showMenuMobile.progress() === 0) {
        showMenuMobile.play();
        lenis.stop();
      } else {
        showMenuMobile.timeScale(1.5);
        showMenuMobile.reverse();
        lenis.start();
      }
    });
  }
});

export function navSetup() {
  function handleScrollDown() {
    gsap.to(navWrap, { y: -navHeight - 1 });
    gsap.to(navBtnChange, {
      y: navHeight + 1,
      onStart: function () {
        tlLogo.restart();
      },
    });
  }

  function handleScrollUp() {
    gsap.to(navWrap, {
      y: 0,
      onComplete: function () {
        // tlLogo.play();
      },
    });
    gsap.to(navBtnChange, {
      y: 0,
    });
  }
  tlLogo.play();

  window.addEventListener(
    "scroll",
    function () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        handleScrollDown();
      } else {
        handleScrollUp();
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    },
    false
  );
}
// LOGO SVG
const logo = navWrap.querySelector(".nav_logo_item");
const lettres = logo.childNodes;
const tlLogo = gsap.timeline({ paused: true });
tlLogo.from(lettres, { scaleY: 2, y: 30, stagger: 0.08, ease: "power2.out" });