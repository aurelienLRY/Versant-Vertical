const { body, validationResult } = require('express-validator');
const xss = require('xss');

exports.validateBookingData = [
  // Validation
  body('description').optional().trim(),
  body('gpsCoordinates').trim().isLength({ min: 1 }).withMessage('GPS coordinates are required.'),
  body('practicedActivities').isArray().withMessage('Practiced activities must be an array.'),
  body('practicedActivities.*.activityName').trim().isLength({ min: 1 }).withMessage('Activity name is required.'),
  body('practicedActivities.*.activityId').isMongoId().withMessage('Activity ID must be a valid Mongo ID.'),
  body('half_day').isBoolean().withMessage('Half day must be a boolean.'),
  body('full_day').isBoolean().withMessage('Full day must be a boolean.'),
  body('max_OfPeople').isNumeric().withMessage('Max number of people must be a number.'),
  body('min_OfPeople').isNumeric().withMessage('Min number of people must be a number.'),
  body('meetingPoint').trim().isLength({ min: 1 }).withMessage('Meeting point is required.'),

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