import { Fancybox } from "@fancyapps/ui";

/**
 * @param {string} selector - CSS-селектор галереи
 * @param {Object} options - опции Fancybox
 */
export function setupFancybox(selector = "[data-fancybox]", options = {}) {
    if (!document.querySelector(selector)) return;

    Fancybox.bind(selector, {
        dragToClose: false,
        autoFocus: false,
        compact: false,
        l10n: {
            CLOSE: "Закрыть",
            NEXT: "Следующий",
            PREV: "Предыдущий",
            MODAL: "Вы можете закрыть это модальное окно, нажав клавишу ESC"
        },
        ...options
    });
}
