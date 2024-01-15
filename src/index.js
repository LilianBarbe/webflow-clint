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
        start: "10% center",
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

  let cmsItems = document.querySelectorAll("[panel-cms-item]");
  cmsItems.forEach((panel, index) => {
    panel.style.paddingTop = `${5 + index + 1}rem`;
  });

  /////// EYES ANIMATION

  $("[newsletter-cms-item]").on("mouseenter", () => {
    $(".page_cursor_dot").addClass("is-here");
  });

  $("[newsletter-cms-item]").on("mouseleave", () => {
    $(".page_cursor_dot").removeClass("is-here");
  });

  ///////// SUBMIT FORM NEWSLETTER

  // document.querySelector("[btn-submit]").addEventListener("click", () => {
  //   document.querySelector('form[name="wf-form-Email-Form"]').submit();
  // });
});

// DRAGGABLE
// importer jquery and jquery-ui
// window.Webflow ||= [];
// window.Webflow.push(() => {
//   $("#clever-internet").draggable({
//     snap: "#clever-internet-container",
//     snapMode: "inner",
//     snapTolerance: 30,
//   });
//   $("#sticker-developers").draggable({ containment: "#sticker-containment" });
//   $("#sticker-designers").draggable({ containment: "#sticker-containment" });
//   $("#sticker-thinkers").draggable({ containment: "#sticker-containment" });
// });

$("#play-video").on("click", function (e) {
  var $video = $("#video");
  src = $video.attr("src");
  $video.attr("src", src + "?autoplay=1");
});

$("#pause-video").on("click", function (e) {
  var $video = $("#video");
  src = $video.attr("src");
  $video.attr("src", src + "?autoplay=0");
});
