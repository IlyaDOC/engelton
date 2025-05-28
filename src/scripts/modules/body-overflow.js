const bodyOverflow = {
    hide() {
        document.body.classList.add("overflow-hidden");
    },
    show() {
        document.body.classList.remove("overflow-hidden");
    }
};

export default bodyOverflow;
