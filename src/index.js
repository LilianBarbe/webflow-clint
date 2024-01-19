// import
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setAccordions } from "./components/accordion.js";
import { navSetup } from "./utils/navSetup.js";
import { applyButtonsBehav } from "./components/buttonBehaviors.js";
import { revealAnimation } from "./components/revealAnim.js";
import { initializeLenisScroll } from "./utils/lenisSetup.js";
import { navHeight } from "./utils/navSetup.js";
console.log(new Date());

// construct
gsap.registerPlugin(ScrollTrigger);
navSetup();
applyButtonsBehav();
revealAnimation();
initializeLenisScroll();
setAccordions();

// const & let
let date = new Date();
const modalDev = document.querySelector("[modal-dev]");
const panneaux = document.querySelectorAll("[panel-cms-item]");
const innerPanneaux = document.querySelectorAll("[panel-bg]");
const panelWrap = document.querySelectorAll(".panel_dot_wrap");
const panelDotList = document.querySelector("[dot-list]");
const mainContentPanneaux = document.querySelectorAll(
  ".panel_content_main_wrap"
);
const gapPanneaux = `calc(100vh - ${navHeight}px - 1rem)`;
let panels = $("[panel-item]");
let dots = $(".panel_dot_item");
const panelContents = document.querySelectorAll(".panel_content_inner");
const componentContent = document.querySelector(".compens");
let decalage = `-${navHeight / 16}` + "rem";

// functions

/// decalage offres
componentContent.style.marginBottom = decalage;
console.log(componentContent);

//// site en dev
if (document.currentScript.src === "http://127.0.0.1:5500/dist/index.js") {
  modalDev.style.display = "flex";
} else {
  modalDev.style.display = "none";
}

//// header
$(".span-wrapper").each(function (index) {
  let relatedEl = $(".span-element").eq(index);
  relatedEl.appendTo($(this));
});

//// height panels
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

if (window.innerWidth > 991) {
  resizePanneaux(mainContentPanneaux);
  window.addEventListener("resize", () => {
    resizePanneaux(mainContentPanneaux);
  });
}
resizePanneaux(innerPanneaux);
resizePanneaux2(panneaux, panelWrap);
panelDotList.style.paddingTop = `${navHeight}px`;

window.addEventListener("resize", () => {
  resizePanneaux(innerPanneaux);
  resizePanneaux2(panneaux, panelWrap);
  panelDotList.style.paddingTop = `${navHeight}px`;
});

//// dots active
window.Webflow ||= [];
window.Webflow.push(() => {
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

  //// fade off panels
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
