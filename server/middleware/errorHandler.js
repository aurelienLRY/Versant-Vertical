module.exports.errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Une erreur s\'est produite.';
    const details = err.details || {};
  
    res.status(statusCode).json({
      status: 'error',
      message: message,
      details: details
    });
  
    next();
  }