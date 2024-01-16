// import "jquery-ui/ui/widgets/draggable";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { navSetup } from "./utils/navSetup.js";
navSetup();

import { applyButtonsBehav } from "./components/buttonBehaviors.js";
applyButtonsBehav();

import { revealAnimation } from "./components/revealAnim.js";
revealAnimation();

import { initializeLenisScroll } from "./utils/lenisSetup.js";
initializeLenisScroll();

import { setAccordions } from "./components/accordion.js";
setAccordions();

let date = new Date();
console.log("Index.js OK" + " " + date.toLocaleString());

// HEADER
$(".span-wrapper").each(function (index) {
  let relatedEl = $(".span-element").eq(index);
  relatedEl.appendTo($(this));
});

// SITE EN DEV
const modalDev = document.querySelector("[modal-dev]");
if (document.currentScript.src === "http://127.0.0.1:5500/dist/index.js") {
  modalDev.style.display = "flex";
} else {
  modalDev.style.display = "none";
}

// HEIGHT PANEL
import { navHeight } from "./utils/navSetup.js";
const panneaux = document.querySelectorAll("[panel-cms-item]");
const innerPanneaux = document.querySelectorAll("[panel-bg]");
const panelWrap = document.querySelectorAll(".panel_dot_wrap");
const panelDotList = document.querySelector("[dot-list]");
const mainContentPanneaux = document.querySelectorAll(
  ".panel_content_main_wrap"
);
const gapPanneaux = `calc(100vh - ${navHeight}px - 1rem)`;

const resizePanneaux = function (...items) {
  items.forEach((itemArray) => {
    itemArray.forEach((item) => {
      item.style.height = gapPanneaux;
    });
  });
};

const resizePanneaux2 = function (...items) {
  items.forEach((itemArray) => {
    itemArray.forEach((item) => {
      item.style.height = `calc(100vh)`;
    });
  });
};

// Ajouter mainContentPanneaux à la fonction de redimensionnement
if (window.innerWidth > 991) {
  resizePanneaux(mainContentPanneaux);
  window.addEventListener("resize", () => {
    resizePanneaux(mainContentPanneaux);
  });
}
resizePanneaux(innerPanneaux);
resizePanneaux2(panneaux, panelWrap);
panelDotList.style.paddingTop = `${navHeight}px`;
// Ajouter un écouteur d'événements pour redimensionner les panneaux lors du redimensionnement de la fenêtre
window.addEventListener("resize", () => {
  resizePanneaux(innerPanneaux);
  resizePanneaux2(panneaux, panelWrap);
  panelDotList.style.paddingTop = `${navHeight}px`;
});

//
window.Webflow ||= [];
window.Webflow.push(() => {
  ////////// DOTS ACTIVE
  let panels = $("[panel-item]");
  let dots = $(".panel_dot_item");

  const panelContents = document.querySelectorAll(".panel_content_inner");
  panelContents.forEach((panelContent) => {
    const panelTl = gsap.timeline({
      scrollTrigger: {
        trigger: panelContent,
        start: "10% 80%",
        end: "10% center",
      },
    });

    panelTl.from(panelContent.children, {
      opacity: 0,
      stagger: 0.2,
      y: 50,
      rotate: -1,
      duration: 0.5,
    });
  });

  function makeDotActive(index) {
    dots.removeClass("is-active");
    dots.eq(index).addClass("is-active");
  }
  makeDotActive(0);
  dots.on("click", function () {
    let index = $(this).index();
    let scrollTo = panels.eq(index);
    if (index === 0) {
      scrollTo = $(".services_cms_wrap");
    }
    panels.css("position", "relative");
    let distance = scrollTo.offset().top;
    panels.removeAttr("style");
    $("html, body").animate({ scrollTop: distance }, 600);
  });

  panels.each(function (index) {
    ScrollTrigger.create({
      trigger: $(this),
      start: "top center",
      end: "10% center",
      onLeaveBack: () => {
        makeDotActive(index - 1);
      },
      onLeave: () => {
        makeDotActive(index);
      },
    });
  });

  ///// FADE OFF
  panels.each(function (index) {
    // Ne pas appliquer l'effet au dernier panel
    if (index !== panels.length - 1) {
      let panel = $(this).parents("[panel-bg]");

      gsap.to(panel, {
        opacity: 0, // DÃ©finit l'opacitÃ© finale
        scrollTrigger: {
          trigger: panel,
          markers: false,
          start: "20% top", // Demarre lorsque le bas du panel atteint le haut de l'Ã©cran
          end: "bottom top", // Termine lorsque le bas du panel atteint le milieu de l'Ã©cran
          scrub: true, // Permet un changement progressif de l'opacitÃ©
          onLeaveBack: () => {},
          onLeave: () => {},
        },
      });
    }
  });

  ////////////// STACKING PANELS
  // let cmsItems = document.querySelectorAll("[panel-cms-item]");
  // cmsItems.forEach((panel) => {
  //   panel.style.paddingTop = navHeight;
  // });

  ///////// SUBMIT FORM NEWSLETTER

  // document.querySelector("[btn-submit]").addEventListener("click", () => {
  //   document.querySelector('form[name="wf-form-Email-Form"]').submit();
  // });
});

// $("#play-video").on("click", function (e) {
//   var $video = $("#video");
//   src = $video.attr("src");
//   $video.attr("src", src + "?autoplay=1");
// });

// $("#pause-video").on("click", function (e) {
//   var $video = $("#video");
//   src = $video.attr("src");
//   $video.attr("src", src + "?autoplay=0");
// });
