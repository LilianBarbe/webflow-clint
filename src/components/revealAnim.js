// REVEAL
import { gsap } from "gsap";
export function revealAnimation() {
  gsap.utils.toArray("[reveal]").forEach(function (element) {
    gsap.fromTo(
      element,
      { opacity: 0, scaleY: 1.5, y: 110 },
      {
        opacity: 1,
        scaleY: 1,
        ease: "Power2.easeOut",
        y: 0,
        duration: 0.3,
        scrollTrigger: {
          trigger: element,
          start: "top 80%", // Démarre l'animation quand le haut de l'élément atteint 80% de la fenêtre
          toggleActions: "play none none none",
        },
      }
    );
  });
}
