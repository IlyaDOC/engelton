import ymapsTouchScroll from "ymaps-touch-scroll";

export default function initMap() {
    const map = document.getElementById("map");

    if (map) {
        let myMap;
        ymaps.ready(init);

        function init() {
            myMap = new ymaps.Map("map", {
                center: centerPoint,
                zoom: zoomValue,
                controls: [
                    "zoomControl", // Элемент управления зумом
                    "trafficControl", // Элемент управления трафиком
                    "typeSelector", // Элемент управления типом карты
                    "fullscreenControl", // Элемент управления полноэкранным режимом
                    "geolocationControl", // Элемент управления геолокацией
                    "routeEditor", // Элемент управления редактором маршрутов
                    "rulerControl" // Элемент управления линейкой
                ]
            });

            placemarks.forEach(function (obj) {
                let myPlacemark = new ymaps.Placemark(
                    obj.coordinates,
                    {},
                    {
                        iconLayout: "default#image",
                        iconImageHref: base_dir,
                        iconImageSize: [77, 60]
                    }
                );

                myMap.geoObjects.add(myPlacemark);
            });

            ymapsTouchScroll(myMap, { preventScroll: true, preventTouch: true });
        }
    }
}
