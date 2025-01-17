const { logger } = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log error
  logger.error('Error:', {
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
    stack: err.stack,
    path: req.originalUrl
  });

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    err.statusCode = 400;
    err.message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    err.statusCode = 400;
    err.message = `Duplicate value for ${Object.keys(err.keyValue).join(', ')}`;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    err.statusCode = 401;
    err.message = 'Invalid token. Please log in again.';
  }

  if (err.name === 'TokenExpiredError') {
    err.statusCode = 401;
    err.message = 'Your token has expired. Please log in again.';
  }

  // Development error response
  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err
    });
  }

  // Production error response
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};

module.exports = errorHandler; 