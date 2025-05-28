/**
 * Инициализирует все аккордеоны с атрибутом data-dropdown
 *
 * <div data-dropdown>
 *     <button data-dropdown-trigger>
 *         <span data-dropdown-label>Выберите</span>
 *         <span data-dropdown-icon>▼</span>
 *     </button>
 *     <div data-dropdown-menu>
 *         <ul>
 *             <li><a data-dropdown-item href="#">Пункт 1</a></li>
 *             <li><a data-dropdown-item href="#">Пункт 2</a></li>
 *         </ul>
 *     </div>
 *  </div>
 */
export default function setupDropdown() {
    const dropdowns = document.querySelectorAll("[data-dropdown]");
    if (!dropdowns.length) return;

    const dropdownsData = [];

    dropdowns.forEach((dropdown) => {
        const minWidthAttr = dropdown.getAttribute("data-dropdown-min");
        const maxWidthAttr = dropdown.getAttribute("data-dropdown-max");

        const minWidth = minWidthAttr ? parseInt(minWidthAttr, 10) : null;
        const maxWidth = maxWidthAttr ? parseInt(maxWidthAttr, 10) : null;

        const data = {
            dropdown,
            minWidth,
            maxWidth,
            initialized: false,
            handlers: []
        };

        dropdownsData.push(data);

        updateDropdown(data);
    });

    window.addEventListener(
        "resize",
        debounce(() => {
            dropdownsData.forEach(updateDropdown);
        }, 200)
    );

    function updateDropdown(data) {
        const screenWidth = window.innerWidth;
        const shouldBeActive =
            (data.minWidth === null || screenWidth >= data.minWidth) &&
            (data.maxWidth === null || screenWidth < data.maxWidth);

        if (shouldBeActive && !data.initialized) {
            initDropdown(data);
        } else if (!shouldBeActive && data.initialized) {
            destroyDropdown(data);
        }
    }

    function initDropdown(data) {
        const dropdown = data.dropdown;
        const trigger = dropdown.querySelector("[data-dropdown-trigger]");
        const label = dropdown.querySelector("[data-dropdown-label]");
        const menu = dropdown.querySelector("[data-dropdown-menu]");
        const icon = dropdown.querySelector("[data-dropdown-icon]");

        if (!trigger || !menu) return;

        const triggerClickHandler = (e) => {
            e.stopPropagation();
            const isActive = dropdown.classList.contains("is-active");

            closeAllDropdowns();

            if (!isActive) {
                dropdown.classList.add("is-active");
                menu.style.display = "block";
                requestAnimationFrame(() => {
                    menu.style.opacity = "1";
                    menu.style.transform = "translateY(0)";
                });
                rotate(icon, true);
            }
        };

        trigger.addEventListener("click", triggerClickHandler);
        data.handlers.push({ element: trigger, event: "click", handler: triggerClickHandler });

        const items = menu.querySelectorAll("[data-dropdown-item]");
        items.forEach((item) => {
            const itemClickHandler = (e) => {
                e.stopPropagation();

                const value = item.dataset.value || item.textContent.trim();

                if (label) {
                    label.textContent = item.textContent.trim();
                }

                dropdown.dispatchEvent(
                    new CustomEvent("dropdown:select", {
                        bubbles: true,
                        detail: { value, text: item.textContent.trim() }
                    })
                );

                closeDropdown(dropdown, menu, icon);
            };

            item.addEventListener("click", itemClickHandler);
            data.handlers.push({ element: item, event: "click", handler: itemClickHandler });
        });

        const documentClickHandler = () => closeDropdown(dropdown, menu, icon);
        const documentKeydownHandler = (e) => {
            if (e.key === "Escape") {
                closeDropdown(dropdown, menu, icon);
            }
        };

        document.addEventListener("click", documentClickHandler);
        document.addEventListener("keydown", documentKeydownHandler);

        data.handlers.push({ element: document, event: "click", handler: documentClickHandler });
        data.handlers.push({
            element: document,
            event: "keydown",
            handler: documentKeydownHandler
        });

        data.initialized = true;
    }

    function destroyDropdown(data) {
        const dropdown = data.dropdown;
        const menu = dropdown.querySelector("[data-dropdown-menu]");
        const icon = dropdown.querySelector("[data-dropdown-icon]");

        // Удаляем все обработчики событий
        data.handlers.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler);
        });
        data.handlers = [];

        // Сбрасываем стили и состояния
        if (menu) {
            menu.style.display = "";
            menu.style.opacity = "";
            menu.style.transform = "";
        }
        if (icon) {
            rotate(icon, false);
        }

        dropdown.classList.remove("is-active");

        data.initialized = false;
    }

    function closeAllDropdowns() {
        document.querySelectorAll("[data-dropdown].is-active").forEach((openDropdown) => {
            const menu = openDropdown.querySelector("[data-dropdown-menu]");
            const icon = openDropdown.querySelector("[data-dropdown-icon]");
            closeDropdown(openDropdown, menu, icon);
        });
    }

    function closeDropdown(dropdown, menu, icon) {
        if (!dropdown || !menu) return;
        dropdown.classList.remove("is-active");
        menu.style.opacity = "0";
        menu.style.transform = "translateY(-10px)";
        setTimeout(() => {
            if (!dropdown.classList.contains("is-active")) {
                menu.style.display = "none";
            }
        }, 200);
        rotate(icon, false);
    }

    function rotate(icon, open) {
        if (icon) {
            icon.style.transition = "transform 0.3s ease";
            icon.style.transform = open ? "rotate(180deg)" : "rotate(0deg)";
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
