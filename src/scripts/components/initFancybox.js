import { Fancybox } from "@fancyapps/ui";
import customSelectComponent from "@scripts/modules/select.js";
import { setupFancybox } from "@scripts/modules/fancybox.js";

export function initFancybox() {
    window.Fancybox = Fancybox;
    setupFancybox("[data-fancybox]", {
        hideScrollbar: true,
        on: {
            done: (slide) => {
                const container = slide.container;
                if (container && container.querySelectorAll(".custom-select")) {
                    customSelectComponent.initSelects(container);
                }
            }
        }
    });
}
