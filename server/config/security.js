const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Rate limiting configuration
const rateLimitConfig = {
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 900000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
};

// Security headers configuration
const helmetConfig = {
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
};

// CORS configuration
const corsConfig = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://ashroyhomestay.com', 'https://www.ashroyhomestay.com']
    : ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  credentials: true,
  maxAge: 86400, // 24 hours
  exposedHeaders: ['Content-Length', 'X-Total-Count']
};

// Create middleware
const limiter = rateLimit(rateLimitConfig);
const securityHeaders = helmet(helmetConfig);

module.exports = {
  limiter,
  securityHeaders,
  corsConfig,
  rateLimitConfig,
  helmetConfig
}; 