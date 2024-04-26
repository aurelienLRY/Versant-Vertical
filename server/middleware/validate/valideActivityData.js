const { body, validationResult } = require("express-validator");
const xss = require("xss");

exports.validateActivityData = [
  // Validation
  body("name").trim().isLength({ min: 1 }).withMessage("Name is required."),
  body("description").optional().trim(),
  body("half_day").isBoolean().withMessage("Half day must be a boolean."),
  body("full_day").isBoolean().withMessage("Full day must be a boolean."),
  body("price_half_day").optional().trim(),
  body("price_full_day").optional().trim(),
  body("min_age").isNumeric().withMessage("Minimum age must be a number."),
  body("max_OfPeople").isNumeric().withMessage("Max number of people must be a number."),
  body("min_OfPeople").isNumeric().withMessage("Min number of people must be a number."),

  // Sanitization
  body("*").customSanitizer((value) => {
    if (typeof value === "string") {
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
