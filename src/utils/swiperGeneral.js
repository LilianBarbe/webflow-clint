import Swiper from "swiper";
import "swiper/css";

export const setupSwiper = function () {
  // Définir le breakpoint
  const breakpoint = window.matchMedia("(max-width: 991px)");
  // Fonction à déclencher au breakpoint
  if (breakpoint.matches) {
    const swiperComponents = document.querySelectorAll("[swiper-component]");
    swiperComponents.forEach((component) => {
      const swiperElement = component.querySelector(".swiper");

      if (swiperElement) {
        const swiper = new Swiper(swiperElement, {
          centeredSlides: true,
          followFinger: true,
          spaceBetween: 10,
          autoHeight: false,
          slidesPerView: 1.03,
          loop: false,
          mousewheel: {
            forceToAxis: true,
          },
          keyboard: {
            enabled: true,
            onlyInViewport: true,
          },
          breakpoints: {
            768: {
              //
            },
            240: {
              //
            },
          },
        });
      } else {
        console.log(`Pas de swiper trouvé`);
      }
    });
    console.log("Breakpoint reached!");
  }
};
