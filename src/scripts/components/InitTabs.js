import setupTabs from "@scripts/modules/tabs";

export function initTabs() {
    setupTabs(".tabs", {
        buttonSelector: ".tab-button",
        panelSelector: ".tab-panel",
        activeClass: "is-active"
    });
}
