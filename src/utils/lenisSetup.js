// lenisSetup.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Lenis from "@studio-freight/lenis";

let lenis; // Déclarer lenis à l'extérieur de la fonction pour une portée globale dans ce module
export function initializeLenisScroll() {
  lenis = new Lenis({ eventsTarget: document.querySelector(".page_main") });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(function (time) {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  console.log(lenis.rootElement);
  return lenis;
}

initializeLenisScroll(); // Initialiser lenis
export { lenis }; // Exporter l'instance lenis
