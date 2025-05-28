/** Добавляет состояние ошибки при отправке формы с пустыми полями */

export default function inputError() {
    const requiredInputs = document.querySelectorAll("input[required]");

    if (requiredInputs) {
        requiredInputs.forEach((requiredInput) => {
            requiredInput.addEventListener("invalid", function () {
                this.classList.add("error");
            });

            requiredInput.addEventListener("valid", function () {
                this.classList.remove("error");
            });
        });
    }
}
