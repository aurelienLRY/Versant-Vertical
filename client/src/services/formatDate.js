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