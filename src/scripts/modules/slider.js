import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, FreeMode, Thumbs, Scrollbar } from "swiper/modules";

export default function initSlider() {
    const heroSlider = new Swiper(".main-hero .swiper", {
        modules: [Pagination, Navigation, Autoplay],
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: ".main-hero .swiper-pagination",
            clickable: true,
            renderBullet: function () {
                return ``;
            }
        }
    });
}
