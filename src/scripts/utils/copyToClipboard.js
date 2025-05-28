/**
 * Копирует текст в буфер обмена
 * @param {string} text - Текст для копирования
 * @returns {Promise<void>}
 */
export default async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log("Скопировано в буфер обмена");
    } catch (err) {
        console.error("Ошибка при копировании:", err);
    }
}
