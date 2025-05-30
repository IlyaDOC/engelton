import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, FreeMode, Thumbs, Scrollbar } from "swiper/modules";

export default function initSlider() {
    const heroSlider = new Swiper(".main-hero .swiper", {
        modules: [Pagination, Navigation, Autoplay],
        slidesPerView: 1,
        loop: "infinite",
        effect: "fade",
        autoplay: {
            delay: 10000,
            disableOnInteraction: false
        },
        pagination: {
            el: ".main-hero .swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return `<button class="${className}">
                            <svg class="progress" width="24" height="24">
                                <circle class="circle-origin" r="10" cx="12" cy="12">
                                </circle>
                                <circle class="dot" r="6" cx="12" cy="12"></circle>
                                <circle class="circle-origin-transparent" r="10" cx="12" cy="12">
                                </circle>
                            </svg>
                        </button>`;
            }
        },
        navigation: {
            prevEl: ".main-hero .nav-button-prev",
            nextEl: ".main-hero .nav-button-next"
        }
    });

    const productCardImageSlider = new Swiper(".product-card .swiper", {
        modules: [Pagination],
        slidesPerView: 1,
        pagination: {
            el: ".product-card .swiper-pagination",
            clickable: true
        }
    });
}
