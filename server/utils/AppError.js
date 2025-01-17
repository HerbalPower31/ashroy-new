class AppError extends Error {
  constructor(message, statusCode = 500, errorCode = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.errorCode = errorCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Common error factory methods
AppError.notFound = (message = 'Resource not found') => {
  return new AppError(message, 404, 'NOT_FOUND');
};

AppError.badRequest = (message = 'Invalid request') => {
  return new AppError(message, 400, 'BAD_REQUEST');
};

AppError.unauthorized = (message = 'Unauthorized access') => {
  return new AppError(message, 401, 'UNAUTHORIZED');
};

AppError.forbidden = (message = 'Forbidden access') => {
  return new AppError(message, 403, 'FORBIDDEN');
};

AppError.validation = (message = 'Validation error') => {
  return new AppError(message, 422, 'VALIDATION_ERROR');
};

module.exports = AppError; 