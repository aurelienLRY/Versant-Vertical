/**
 * Formats a date string into a localized date format.
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} The formatted date string.
 */
export function formatDate(dateString) {
    const options = {day: 'numeric',month: 'long', year: 'numeric'  };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  /**
   * Formats a date string into a localized date format.
   * @param {string} dateString - The date string to be formatted.
   * @returns {string} The formatted date string.
   */
  export function formatDateToInput(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0 en JavaScript
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  // GERE LES HORAIRES  DE RESERVATION

  export function formatTime(timeString) {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }


// fonction qui permet de formater une dates à  partir d'un objet date ("2024-04-25T20:09:35.337Z") en format français et retoun  dd/mm/yyyy à hh:mm
export function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const options = {day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'};
  return dateTime.toLocaleDateString(undefined, options);
}
