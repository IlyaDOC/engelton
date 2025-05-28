import { Fancybox } from "@fancyapps/ui";

import getBrowserName from "@scripts/utils/checkbrowser";
import initComponents from "@scripts/components/initComponents.js";
import initModules from "@scripts/modules/initModules.js";
import initUtils from "@scripts/utils/initUtils.js";

// Присваиваем Fancybox глобальной переменной
window.Fancybox = Fancybox;

document.addEventListener("DOMContentLoaded", () => {
    initModules();
    initComponents();
    initUtils();
});

// Если браузер определен, добавляем соответствующий класс к тегу html
const browser = getBrowserName();
if (browser) {
    document.documentElement.classList.add("browser-" + browser);
}
