/** Функция клонирует слайды для выбранного слайдера для корректной работы */
export function sliderClone(parent) {
    const allSlides = document.querySelectorAll(`${parent} .swiper-slide`);
    const slidesCount = allSlides.length;
    let iterationCount = 0;

    if (slidesCount >= 9 || !slidesCount) {
        return;
    }

    iterationCount = Math.floor(9 / slidesCount);
    for (let i = 0; i < iterationCount - 1; i++) {
        allSlides.forEach((slide) => {
            const slidesParent = slide.parentElement;
            let clonedSlide = slide.cloneNode(true);
            slidesParent.append(clonedSlide);
        });
    }
}
