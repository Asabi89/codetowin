/**
 * Fonctions de validation réutilisables pour les formulaires
 */

/**
 * Valide si une adresse email est au bon format
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Valide la force d'un mot de passe (min 8 caractères, au moins une lettre et un chiffre)
 * @param {string} password
 * @returns {boolean}
 */
export function validatePassword(password) {
  if (!password || password.length < 8) return false;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasLetter && hasNumber;
}

/**
 * Vérifie si une valeur n'est pas vide (chaîne vide, null, undefined)
 * @param {any} value
 * @returns {boolean}
 */
export function validateRequired(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/**
 * Valide si une URL est valide et commence par http ou https
 * @param {string} url
 * @returns {boolean}
 */
export function validateUrl(url) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (_) {
    return false;
  }
}
