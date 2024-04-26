/**
 * Middleware to validate customer session
 * @module validateCustomerSession
 */

const { body, validationResult } = require('express-validator');
const xss = require('xss');

/**
 * Array of validation and sanitization functions for customer session data.
 * @type {Array<function>}
 */

exports.validateCustomerSession = [
    // Validation
    body('sessionId').isString().withMessage('Le sessionId doit être une chaîne de caractères.'),
    body('date').isISO8601().withMessage('La date doit être au format ISO 8601 valide.'),
    body('status').isString().withMessage('Le status doit être une chaîne de caractères.'),
    body('typeOfReservation').optional().isString().withMessage('Le type de réservation doit être une chaîne de caractères.'),
    body('number_of_people').isNumeric().withMessage('Le nombre de personnes doit être un nombre.'),
    body('last_name').isString().withMessage('Le nom doit être une chaîne de caractères.'),
    body('first_names').isString().withMessage('Les prénoms doivent être une chaîne de caractères.'),
    body('email').isEmail().withMessage('L\'email doit être une adresse email valide.'),
    body('phone').isString().withMessage('Le téléphone doit être une chaîne de caractères.'),
    body('people_list').isArray().withMessage('La liste de personnes doit être un tableau.'),
    body('people_list.*.size').isNumeric().withMessage('La taille doit être un nombre.'),
    body('people_list.*.weight').isNumeric().withMessage('Le poids doit être un nombre.'),


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
    }  ),

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
