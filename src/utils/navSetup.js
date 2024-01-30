// import
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenis } from "./lenisSetup"; // Importer les éléments nécessaires
gsap.registerPlugin(ScrollTrigger);

// const
const navWrap = document.querySelector(".nav_wrap");
export const navHeight = navWrap.offsetHeight;
const navBtnChange = document.querySelector(".nav_btn_change");
const menuBtnMobile = document.querySelector(".nav_menu_icon");
const menuMobile = document.querySelector("[menu-links]");
const logo = navWrap.querySelector(".nav_logo_item");
const lettres = logo.childNodes;
const tlLogo = gsap.timeline({ paused: true });

// fonctions

//// ANIMATION LOGO
tlLogo.from(lettres, { scaleY: 2, y: 30, stagger: 0.08, ease: "power2.out" });
tlLogo.play();
lenis.start();

//// ANIMATION MENU MOBILE
if (window.innerWidth <= 991) {
  const showMenuMobile = gsap.timeline({
    paused: true,
  });
  showMenuMobile.set(menuMobile, { display: "flex" });
  showMenuMobile.from(menuMobile, { x: "100%" });
  showMenuMobile.from(menuMobile.children, { opacity: 0, stagger: 0.2 }, 0.2);

  menuBtnMobile.addEventListener("click", function () {
    if (showMenuMobile.progress() === 0) {
      showMenuMobile.play();
    } else {
      showMenuMobile.timeScale(1.5);
      showMenuMobile.reverse();
    }
    // let stopped = false;
    // if (!stopped) {
    //   document.querySelector(".lenis").classList.add("lenis-stopped");
    //   stopped = true;
    // } else {
    //   console.log("retirer");
    //   document.querySelector(".lenis").classList.remove("lenis-stopped");
    //   stopped = false;
    // }
  });
}

//// Création de l'animation dropdown
if (window.innerWidth > 991) {
  let tlDropdown = gsap.timeline({ paused: true });
  gsap.set(".dropdown_inner_wrap", { xPercent: -40 });

  // Animation
  tlDropdown.from(".dropdown_inner_wrap", {
    y: 20,
    opacity: 0,
    duration: 0.3,
  });

  // Événement mouseenter
  document
    .querySelector("[dropdown-link]")
    .addEventListener("mouseenter", function () {
      tlDropdown.play();
    });
}

//// Scroll vers le HAUT
function scrollBas() {
  gsap.to(navWrap, { y: -navHeight - 1 });
  gsap.to(navBtnChange, {
    y: navHeight + 1,
    onStart: function () {
      tlLogo.restart();
    },
  });
  if (window.innerWidth <= 991) {
    gsap.to(menuMobile, {
      y: navHeight + 1,
    });
  }
}

//// Scroll vers le BAS
function scrollHaut() {
  gsap.to(navWrap, {
    y: 0,
  });
  gsap.to(navBtnChange, {
    y: 0,
  });
  if (window.innerWidth <= 991) {
    gsap.to(menuMobile, {
      y: 0,
    });
  }
}

//// EXPORT
export function navSetup() {
  lenis.on("scroll", function (e) {
    let scrollDirection = e.direction;
    if (scrollDirection === 1) {
      scrollBas();
    } else {
      // au scroll haut
      scrollHaut();
    }
  });
}
