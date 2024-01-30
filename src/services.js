// import
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealAnimation } from "./components/revealAnim.js";
import { setAccordions } from "./components/accordion.js";
import { applyButtonsBehav } from "./components/buttonBehaviors.js";
import { navSetup } from "./utils/navSetup.js";
import { setupSwiper } from "./utils/swiperGeneral.js";

// construct
gsap.defaults({ duration: 0.25 });
gsap.registerPlugin(ScrollTrigger);
revealAnimation();
setAccordions();
applyButtonsBehav();
navSetup();
setupSwiper();

// const & let
const modalWrap = document.querySelector('[modal="wrap"]');
const modalQuitButton = modalWrap.querySelector('[modal="button"]');
const modalBg = modalWrap.querySelector('[modal="bg"]');
const modalCard = modalWrap.querySelector('[modal="card"]');
const docButton = document.querySelector('[modal="want"]');
const emptyTesti = document.querySelector("[testi-empty]");
const testiList = document.querySelector("[testi-list]");

// functions
// empty testimonial
testiList.append(emptyTesti);

//// services
$("[tr-scroll-toggle='component']").each(function (index) {
  // get elements
  let component = $(this);
  let lists = component.find("[tr-scroll-toggle='list']");
  // set item total
  let itemTotal = lists.first().children().length;
  component.find("[tr-scroll-toggle='number-total']").text(itemTotal);
  // create trigger divs & spacer
  let firstTrigger = component.find("[tr-scroll-toggle='trigger']").first();
  for (let i = 1; i < itemTotal; i++) {
    firstTrigger.clone().appendTo(component);
  }
  let triggers = component.find("[tr-scroll-toggle='trigger']");
  firstTrigger.css("margin-top", "-100vh");
  let trSpacer = $(
    "<div class='tr-scroll-toggle-spacer' style='width: 100%; height: 80vh;'></div>"
  )
    .hide()
    .appendTo(component);
  // check for min width
  let minWidth = 0;
  let trMinWidth = component.attr("tr-min-width");
  if (trMinWidth !== undefined && trMinWidth !== false) {
    minWidth = +trMinWidth;
  }
  // main breakpoint
  gsap.matchMedia().add(`(min-width: ${minWidth}px)`, () => {
    // show spacer
    trSpacer.show();
    // switch which item is active
    function makeItemActive(activeIndex) {
      component
        .find("[tr-scroll-toggle='transform-y']")
        .css("transform", `translateY(${activeIndex * -100}%)`);
      component
        .find("[tr-scroll-toggle='transform-x']")
        .css("transform", `translateX(${activeIndex * -100}%)`);
      component
        .find("[tr-scroll-toggle='number-current']")
        .text(activeIndex + 1);
      lists.each(function (index) {
        $(this).children().removeClass("is-active");
        $(this).children().eq(activeIndex).addClass("is-active");
      });
    }
    makeItemActive(0);
    // scroll to trigger div on click of anchor
    let anchorLinks = component.find("[tr-anchors]").children();
    anchorLinks.on("click", function () {
      let myIndex = $(this).index();
      let scrollDistance =
        triggers.eq(myIndex).offset().top + triggers.eq(myIndex).height() - 1;
      $("html, body").animate({ scrollTop: scrollDistance });
    });
    // triggers timeline
    triggers.each(function (index) {
      let triggerIndex = index;
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: "top top",
          end: "bottom top",
          scrub: true,
          onToggle: ({ self, isActive }) => {
            if (isActive) {
              makeItemActive(triggerIndex);
            }
          },
        },
        defaults: {
          ease: "none",
        },
      });
      lists.each(function () {
        let childItem = $(this).children().eq(triggerIndex);
        tl.to(
          childItem.find("[tr-item-animation='scale-to-1']"),
          { scale: 1 },
          0
        );
        tl.from(
          childItem.find("[tr-item-animation='scale-from-1']"),
          { scale: 1 },
          0
        );
        tl.to(
          childItem.find("[tr-item-animation='progress-horizontal']"),
          { width: "100%" },
          0
        );
        tl.to(
          childItem.find("[tr-item-animation='progress-vertical']"),
          { height: "100%" },
          0
        );
        tl.to(
          childItem.find("[tr-item-animation='rotate-to-0']"),
          { rotation: 0 },
          0
        );
        tl.from(
          childItem.find("[tr-item-animation='rotate-from-0']"),
          { rotation: 0 },
          0
        );
      });
    });
    // component timeline
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: component,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      defaults: {
        ease: "none",
      },
    });
    tl.to(
      component.find("[tr-section-animation='scale-to-1']"),
      { scale: 1 },
      0
    );
    tl.from(
      component.find("[tr-section-animation='scale-from-1']"),
      { scale: 1 },
      0
    );
    tl.to(
      component.find("[tr-section-animation='progress-horizontal']"),
      { width: "100%" },
      0
    );
    tl.to(
      component.find("[tr-section-animation='progress-vertical']"),
      { height: "100%" },
      0
    );
    tl.to(
      component.find("[tr-section-animation='rotate-to-0']"),
      { rotation: 0 },
      0
    );
    tl.from(
      component.find("[tr-section-animation='rotate-from-0']"),
      { rotation: 0 },
      0
    );
    // optional scroll snapping
    if (component.attr("tr-scroll-snap") === "true") {
      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: component,
          start: "top top",
          end: "bottom bottom",
          snap: {
            snapTo: "labelsDirectional",
            duration: { min: 0.01, max: 0.2 },
            delay: 0.0001,
            ease: "power1.out",
          },
        },
      });
      triggers.each(function (index) {
        tl2.to($(this), { scale: 1, duration: 1 });
        tl2.addLabel("trigger" + index);
      });
    }
    // smaller screen sizes
    return () => {
      trSpacer.hide();
      component
        .find("[tr-scroll-toggle='transform-y']")
        .css("transform", "translateY(0%)");
      component
        .find("[tr-scroll-toggle='transform-x']")
        .css("transform", "translateX(0%)");
      lists.each(function (index) {
        $(this).children().removeClass("is-active");
      });
    };
  });
});

const setupSwiperAutres = function () {
  // Définir le breakpoint
  // Fonction à déclencher au breakpoint
  const swiper = new Swiper(".swiper.autres_cms_wrap", {
    centeredSlides: false,
    followFinger: true,
    spaceBetween: 32,
    loop: false,
    mousewheel: {
      forceToAxis: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      991: {
        slidesPerView: 2.6,
      },
      240: {
        centeredSlides: false,
        slidesPerView: 1.1,
      },
    },
  });
};

setupSwiperAutres();

// modal télécharger
const openModal = () => {
  modalWrap.classList.remove("display-none");
  document.body.style.overflow = "hidden";
  gsap.set(modalCard, {
    opacity: 1,
    y: 0,
  });
  gsap.from(modalCard, {
    opacity: 0,
    y: 100,
  });
};

const closeModal = () => {
  gsap.to(modalCard, {
    opacity: 0,
    y: 20,
    onComplete: function () {
      modalWrap.classList.add("display-none");
      document.body.style.overflow = "auto";
    },
  });
};

docButton.addEventListener("click", openModal);
modalQuitButton.addEventListener("click", closeModal);
modalBg.addEventListener("click", closeModal);

if (window.innerWidth > 991) {
  var wrap = document.querySelector(".methode_wrap");
  var methodTitle = document.querySelector(".react");

  // check if elements exist
  var distance =
    wrap.getBoundingClientRect().top - methodTitle.getBoundingClientRect().top;
  wrap.style.marginTop = -10 + "vh";
  console.log(methodTitle.getBoundingClientRect().top);
  console.log(wrap.getBoundingClientRect().top);

  var titre = document.querySelector(".real_contain--mw1");
  var sectionTop = document.querySelector(".real_wrap--pt12");

  if (titre && sectionTop) {
    var distance = titre.offsetTop - sectionTop.offsetTop;
    titre.style.marginTop = -10 + "vh";
  }
}
