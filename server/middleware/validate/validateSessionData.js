/**
 * Middleware function to validate Session data.
 * @module validateBookingData
 */

const { body, validationResult } = require('express-validator');
const xss = require('xss');

/**
 * Array of validation and sanitization functions for Session data.
 * @type {Array<function>}
 */
exports.validateSessionData = [
  // Validation
  body('status').isString().withMessage('Le statut doit être une chaîne de caractères.'),
  body('date').isISO8601().withMessage('La date doit être au format ISO 8601 valide.'),
  body('startTime').isString().withMessage('L\'heure de début doit être une chaîne de caractères.'),
  body('endTime').isString().withMessage('L\'heure de fin doit être une chaîne de caractères.'),
  body('activity').isString().withMessage('L\'activité doit être une chaîne de caractères.'),
  body('spot').isString().withMessage('L\'emplacement doit être une chaîne de caractères.'),
  body('placesMax').isNumeric().withMessage('Le nombre maximum d\'utilisateurs doit être une chaîne de caractères.'),
  body('placesReserved').isNumeric().withMessage('Les places réservées doivent être une chaîne de caractères.'),

  // Sanitization
  /**
   * Custom sanitizer function to sanitize all request body values using XSS.
   * @param {*} value - The value to be sanitized.
   * @returns {*} - The sanitized value.
   */
  body('*').customSanitizer(value => {
    if (typeof value === 'string') {
      return xss(value);
    }
    return value;
  }),

  // Error handling
  /**
   * Error handling middleware function.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {function} next - The next middleware function.
   */
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorObject = errors.array().reduce((acc, error) => {
        acc[error.param] = error.msg;
        return acc;
      }, {});
      const err = new Error('Validation failed.');
      err.statusCode = 400;
      err.details = errorObject;
      return next(err);
    }
    next();
  },
];