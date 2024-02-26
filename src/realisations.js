// import
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navSetup } from "./utils/navSetup.js";
import { applyButtonsBehav } from "./components/buttonBehaviors.js";

// const
const cmsItems = document.querySelectorAll("[real-cms-item");
const clearBtn = document.querySelector("[fs-cmsfilter-element='clear']");
const formWrap = document.querySelector(".form_option_list--gp0-5");

// construct
gsap.registerPlugin(ScrollTrigger);
navSetup();
applyButtonsBehav();

// functions
formWrap.insertAdjacentElement("beforeend", clearBtn);

window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  "cmsfilter",
  (filterInstances) => {
    // The callback passes a `filterInstances` array with all the `CMSFilters` instances on the page.
    const [filterInstance] = filterInstances;
    // The `renderitems` event runs whenever the list renders items after filtering.
    filterInstance.listInstance.on("renderitems", (renderedItems) => {
      gsap.to(renderedItems, { y: 200, stagger: 0.2 });
    });
  },
]);
