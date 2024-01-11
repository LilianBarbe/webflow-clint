// lenisSetup.js
import Lenis from "@studio-freight/lenis";

// LENIS SMOOTH SCROLL

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

export function initializeLenisScroll() {
  requestAnimationFrame(raf);
}
export { lenis };
