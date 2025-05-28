/**
 * Инициализирует все аккордеоны с атрибутом data-ac
 *
 * <div data-ac data-one-open="true">
 *   <div data-ac-item>
 *     <div data-ac-header>Заголовок <span data-ac-icon>▼</span></div>
 *     <div data-ac-content>Контент</div>
 *   </div>
 * </div>
 */
export default function setupAccordion() {
    const accordions = document.querySelectorAll("[data-ac]");
    if (!accordions.length) return;

    const accordionsData = [];

    accordions.forEach((accordion) => {
        const minWidthAttr = accordion.getAttribute("data-ac-min");
        const maxWidthAttr = accordion.getAttribute("data-ac-max");

        const minWidth = minWidthAttr ? parseInt(minWidthAttr, 10) : null;
        const maxWidth = maxWidthAttr ? parseInt(maxWidthAttr, 10) : null;

        const data = {
            accordion,
            minWidth,
            maxWidth,
            initialized: false,
            handlers: []
        };

        accordionsData.push(data);

        updateAccordion(data);
    });

    window.addEventListener(
        "resize",
        debounce(() => {
            accordionsData.forEach(updateAccordion);
        }, 200)
    );

    function updateAccordion(data) {
        const screenWidth = window.innerWidth;
        const shouldBeActive =
            (data.minWidth === null || screenWidth >= data.minWidth) &&
            (data.maxWidth === null || screenWidth < data.maxWidth);

        if (shouldBeActive && !data.initialized) {
            initAccordion(data);
        } else if (!shouldBeActive && data.initialized) {
            destroyAccordion(data);
        }
    }

    function initAccordion(data) {
        const accordion = data.accordion;
        const oneOpen = accordion.dataset.oneOpen !== "false";
        const items = accordion.querySelectorAll("[data-ac-item]");

        items.forEach((item) => {
            const header = item.querySelector("[data-ac-header]");
            const content = item.querySelector("[data-ac-content]");
            const icon = item.querySelector("[data-ac-icon]");

            if (!header || !content) return;

            if (content) {
                content.style.height = "0";
                content.style.overflow = "hidden";
            }

            const clickHandler = () => {
                const isActive = item.classList.contains("is-active");

                if (oneOpen && !isActive) {
                    items.forEach((el) => {
                        el.classList.remove("is-active");
                        collapse(el.querySelector("[data-ac-content]"));
                        rotate(el.querySelector("[data-ac-icon]"), false);
                    });
                }

                if (isActive) {
                    item.classList.remove("is-active");
                    collapse(content);
                    rotate(icon, false);
                } else {
                    item.classList.add("is-active");
                    expand(content);
                    rotate(icon, true);
                }
            };

            header.addEventListener("click", clickHandler);
            data.handlers.push({ header, clickHandler });

            // При инициализации выставляем правильное состояние
            if (item.classList.contains("is-active")) {
                expand(content, true);
                rotate(icon, true);
            } else {
                collapse(content, false);
                rotate(icon, false);
            }
        });

        data.initialized = true;
    }

    function destroyAccordion(data) {
        const accordion = data.accordion;
        const items = accordion.querySelectorAll("[data-ac-item]");

        // Удаляем обработчики кликов
        data.handlers.forEach(({ header, clickHandler }) => {
            header.removeEventListener("click", clickHandler);
        });
        data.handlers = [];

        // Сбрасываем стили у всех контентов и иконок
        items.forEach((item) => {
            const content = item.querySelector("[data-ac-content]");
            const icon = item.querySelector("[data-ac-icon]");

            if (content) {
                content.style.height = "auto";
                content.style.overflow = "visible";
            }
            if (icon) {
                rotate(icon, false);
            }

            item.classList.remove("is-active");
        });

        data.initialized = false;
    }

    function collapse(el, animate = true) {
        if (!el) return;
        if (!animate) {
            el.style.height = "0";
            return;
        }
        el.style.height = el.scrollHeight + "px";
        requestAnimationFrame(() => {
            el.style.height = "0";
        });
    }

    function expand(el, animate = true) {
        if (!el) return;
        const height = el.scrollHeight;
        el.style.height = "0";
        requestAnimationFrame(() => {
            el.style.height = height + "px";
        });
        if (!animate) {
            el.style.height = height + "px";
        }
    }

    function rotate(icon, isOpen) {
        if (icon) {
            icon.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
        }
    }

    function debounce(func, wait = 100) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
}
