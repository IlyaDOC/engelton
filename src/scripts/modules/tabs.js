/**
 * @param {string} containerSelector - Селектор обёртки, содержащей кнопки и панели
 * @param {Object} [options] - Дополнительные опции
 * @param {string} [options.buttonSelector='.tab-button'] - Селектор кнопки
 * @param {string} [options.panelSelector='.tab-panel'] - Селектор панели
 * @param {string} [options.activeClass='is-active'] - Класс активного элемента
 * Пример использования
 * setupTabs('.tabs', {
        buttonSelector: '.tab-button',
        panelSelector: '.tab-panel',
        activeClass: 'is-active'
    });
 * 
 */

export default function setupTabs(containerSelector, options = {}) {
    const {
        buttonSelector = ".tab-button",
        panelSelector = ".tab-panel",
        activeClass = "is-active"
    } = options;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    const buttons = container.querySelectorAll(buttonSelector);
    const panels = container.querySelectorAll(panelSelector);

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const target = button.dataset.tab;

            buttons.forEach((btn) => btn.classList.remove(activeClass));
            panels.forEach((panel) => panel.classList.remove(activeClass));

            button.classList.add(activeClass);
            const activePanel = container.querySelector(`${panelSelector}[data-tab="${target}"]`);
            if (activePanel) {
                activePanel.classList.add(activeClass);
            }
        });
    });
}
