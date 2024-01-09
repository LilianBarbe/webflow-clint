// lenisSetup.js
import Lenis from "@studio-freight/lenis";

const lenis = new Lenis();

lenis.on("scroll", (e) => {
  // console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

export default function initializeLenisScroll() {
  requestAnimationFrame(raf);
}
