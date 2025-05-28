/** Скрываем навигацию у слайдера при недостаточном количестве слайдов */
export default function hideNavigation() {
    // Проверяем количество слайдов
    const totalSlides = this.slides.length;
    const visibleSlides = this.params.slidesPerView;

    // Скрываем стрелки, если слайдов недостаточно
    if (totalSlides <= visibleSlides) {
        this.navigation.prevEl.style.display = "none";
        this.navigation.nextEl.style.display = "none";
    } else {
        this.navigation.prevEl.style.display = "";
        this.navigation.nextEl.style.display = "";
    }
}
