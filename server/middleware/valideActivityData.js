const { body, validationResult } = require('express-validator');
const xss = require('xss');

exports.validateActivityData = [
  // Validation
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required.'),
  body('description').optional().trim(),
  body('half_day').isBoolean().withMessage('Half day must be a boolean.'),
  body('full_day').isBoolean().withMessage('Full day must be a boolean.'),
  body('price_half_day').optional().trim(),
  body('price_full_day').optional().trim(),
  body('minimum_age').isNumeric().withMessage('Minimum age must be a number.'),
  body('max_number_of_people').isNumeric().withMessage('Max number of people must be a number.'),
  body('min_number_of_people').isNumeric().withMessage('Min number of people must be a number.'),

  // Sanitization
  body('*').customSanitizer(value => {
    if (typeof value === 'string') {
      return xss(value);
    }
    return value;
  }),

  // Error handling
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];