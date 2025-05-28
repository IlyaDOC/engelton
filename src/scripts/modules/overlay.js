/** Добавление и отключение затемнения экрана */
const overlay = {
    overlay: document.getElementById("overlay"),
    show() {
        this.overlay.classList.add("show");
    },
    hide() {
        this.overlay.classList.remove("show");
    }
};

export default overlay;
