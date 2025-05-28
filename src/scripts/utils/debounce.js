/**
 * Задерживает выполнение функции, пока не пройдёт delay миллисекунд
 * с момента последнего вызова.
 *
 * @param {Function} func - Функция, которую нужно debounce-ить
 * @param {number} delay - Задержка в миллисекундах
 * @returns {Function}
 */
export default function debounce(func, delay = 300) {
    let timeoutId;

    return function (...args) {
        const context = this;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}
