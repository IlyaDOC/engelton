/**
 * Проверяет, является ли строка валидным email-адресом
 * @param {string} email
 * @returns {boolean}
 */
export default function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}
