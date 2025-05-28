/** Для работы, требуется поместить select в .custom-select */

const setupCustomSelect = {
    customSelectElements: document.querySelectorAll(".custom-select"),

    init() {
        this.initSelects(document);
    },

    initSelects(container) {
        const selects = container.querySelectorAll(".custom-select");
        selects.forEach((el) => {
            this.createCustomSelectComponent(el);
        });
    },

    createCustomSelectComponent(el) {
        this.createSelect(el);
        this.createOptions(el);
        this.customSelectClickHandler(el);
        this.selectItemsClickHandler(el);
        this.closeOnWindowClick(el);
    },

    createSelect(el) {
        const select = document.createElement("div");
        const options = this.getOptions(el);
        select.classList.add("select");
        const selectedOption = options.find((option) => option.isSelected === true);

        if (selectedOption) {
            select.textContent = selectedOption.text;
            select.setAttribute("data-value", selectedOption.value);
        }

        el.append(select);
    },

    createOptions(el) {
        const options = this.getOptions(el);
        const selectItems = document.createElement("div");
        selectItems.classList.add("select-items");
        el.append(selectItems);
        options.forEach((option) => {
            if (option.isSelected) return;
            const selectItem = document.createElement("div");
            selectItem.classList.add("select-item");
            selectItem.textContent = option.text;
            selectItem.setAttribute("data-value", option.value);
            selectItems.append(selectItem);
        });
    },

    getOptions(el) {
        const options = el.querySelectorAll("select option");
        const optionsArray = [];
        for (const option of options) {
            optionsArray.push({
                text: option.textContent,
                value: option.value,
                isSelected: option.hasAttribute("selected")
            });
        }

        return optionsArray;
    },

    customSelectClickHandler(el) {
        const select = el.querySelector(".select");
        select.addEventListener("click", () => {
            el.classList.toggle("active");
        });
    },

    selectItemsClickHandler(el) {
        const defaultOptions = el.querySelectorAll("option");
        const selectItems = el.querySelectorAll(".select-item");
        const select = el.querySelector(".select");
        selectItems.forEach((selectItem) => {
            selectItem.addEventListener("click", () => {
                selectItems.forEach((item) => item.classList.remove("selected"));
                selectItem.classList.add("selected");
                defaultOptions.forEach((defaultOption) => {
                    defaultOption.removeAttribute("selected");

                    if (selectItem.getAttribute("data-value") === defaultOption.value) {
                        defaultOption.setAttribute("selected", "");
                        select.innerText = defaultOption.textContent;
                        el.classList.remove("active");
                    }
                });
            });
        });
    },

    closeOnWindowClick(el) {
        document.addEventListener("click", (event) => {
            if (event.target.closest(".custom-select") !== el.closest(".custom-select")) {
                el.classList.remove("active");
            }
        });
    }
};

export default setupCustomSelect;
