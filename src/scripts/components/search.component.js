const searchComponent = {
    searchElement: document.getElementById("searchComponent"),
    searchShow: document.getElementById("searchShow"),
    searchHide: document.getElementById("searchHide"),
    init() {
        this.showSearch();
        this.hideSearch();
    },
    showSearch() {
        this.searchShow.addEventListener("click", () => {
            this.searchElement.classList.add("showed");
        });
    },
    hideSearch() {
        this.searchHide.addEventListener("click", () => {
            this.searchElement.classList.remove("showed");
        });
    }
};

export default searchComponent;
