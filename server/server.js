const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');
const { limiter, securityHeaders, corsConfig } = require('./config/security');
const { logger, morganMiddleware } = require('./config/logger');
const { connectDB } = require('./config/database');
const { findAvailablePort, setupGracefulShutdown } = require('./config/server');
const routes = require('./routes');

// Load environment variables
dotenv.config();

// Handle uncaught exceptions
process.on('uncaughtException', err => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  logger.error(err.stack);
  process.exit(1);
});

const app = express();

// Security middleware
app.use(securityHeaders);
app.use(limiter);

// Logging middleware
app.use(morganMiddleware);

// CORS middleware
app.use(cors(corsConfig));

// Body parsers with size limits
app.use(express.json({ 
  limit: '10mb',
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb'
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

// API routes with version prefix
const API_PREFIX = '/api/v1';
app.use(API_PREFIX, routes);

// Error handling
app.use(errorHandler);

// Handle 404
app.use((req, res) => {
  logger.warn(`404 - Route not found: ${req.originalUrl}`);
  res.status(404).json({ 
    status: 'error',
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Start server with port finding
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();
    
    // Then start the server
    const PORT = await findAvailablePort(process.env.PORT || 5000);
    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
      logger.info(`🔗 API available at http://localhost:${PORT}${API_PREFIX}`);
      logger.info(`🔗 Health check available at http://localhost:${PORT}/health`);
    });

    // Setup graceful shutdown
    setupGracefulShutdown(server);

  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  logger.error(err.stack);
  process.exit(1);
});

startServer(); 