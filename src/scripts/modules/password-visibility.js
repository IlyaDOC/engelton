/** Функционал для скрытия и показа пароля */
export default function passwordVisibility() {
    const inputPasswords = document.querySelectorAll(".input-password");
    if (inputPasswords && inputPasswords.length > 0) {
        inputPasswords.forEach((inputPassword) => {
            const hiddenPasswordIcon = inputPassword.querySelector(".input-password__hidden");
            const showedPasswordIcon = inputPassword.querySelector(".input-password__showed");
            const passwordInput = inputPassword.querySelector(".input");
            hiddenPasswordIcon.addEventListener("click", () => {
                hiddenPasswordIcon.style.display = "none";
                showedPasswordIcon.style.display = "block";
                passwordInput.setAttribute("type", "text");
            });

            showedPasswordIcon.addEventListener("click", () => {
                hiddenPasswordIcon.style.display = "block";
                showedPasswordIcon.style.display = "none";
                passwordInput.setAttribute("type", "password");
            });
        });
    }
}
