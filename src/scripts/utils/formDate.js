/**
 * Форматирует дату в строку: "дд.мм.гггг"
 * @param {Date|string|number} inputDate - Объект Date, строка или timestamp
 * @returns {string}
 */
export default function formDate(inputDate) {
    const date = new Date(inputDate);

    if (isNaN(date.getTime())) {
        return "";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // месяцы от 0 до 11
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}
