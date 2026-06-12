/**
 * Utilitaires de formatage de données
 */

/**
 * Formate un montant en monnaie USD
 * @param {number|string} amount 
 * @returns {string}
 */
export function formatCurrency(amount) {
  const parsed = parseFloat(amount);
  if (isNaN(parsed)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(parsed);
}

/**
 * Formate une date en format français lisible
 * @param {string|Date} dateVal 
 * @returns {string}
 */
export function formatDate(dateVal) {
  if (!dateVal) return '';
  const date = new Date(dateVal);
  if (isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

/**
 * Formate une plage de dates (ex: "12 Oct - 15 Oct 2026")
 * @param {string} startVal 
 * @param {string} endVal 
 * @returns {string}
 */
export function formatDateRange(startVal, endVal) {
  if (!startVal || !endVal) return '';
  const start = new Date(startVal);
  const end = new Date(endVal);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return '';

  const startFormatter = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' });
  const endFormatter = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

  return `${startFormatter.format(start)} - ${endFormatter.format(end)}`;
}

/**
 * Calcule et formate le nombre de jours restants avant une date d'échéance
 * @param {string|Date} deadlineVal 
 * @returns {string}
 */
export function formatDaysRemaining(deadlineVal) {
  if (!deadlineVal) return '';
  const today = new Date();
  const deadline = new Date(deadlineVal);
  if (isNaN(deadline.getTime())) return '';

  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const deadlineDay = new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate());
  
  const diffTime = deadlineDay - todayStart;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'Terminé';
  if (diffDays === 0) return "Finit aujourd'hui";
  if (diffDays === 1) return 'Finit demain';
  return `Il reste ${diffDays} jours`;
}
