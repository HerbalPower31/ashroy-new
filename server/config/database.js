const mongoose = require('mongoose');
const { logger } = require('./logger');

let isConnecting = false;
let retryCount = 0;
const MAX_RETRIES = 5;
const INITIAL_RETRY_DELAY = 1000;
const MAX_RETRY_DELAY = 10000;

const dbOptions = {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  maxIdleTimeMS: 60000,
  connectTimeoutMS: 30000,
  retryWrites: true,
  retryReads: true,
  autoIndex: process.env.NODE_ENV !== 'production',
  family: 4,
  heartbeatFrequencyMS: 10000
};

const handleConnectionError = async (error) => {
  logger.error('❌ MongoDB connection error:', error);
  if (retryCount < MAX_RETRIES) {
    retryCount++;
    const timeout = Math.min(INITIAL_RETRY_DELAY * Math.pow(2, retryCount - 1), MAX_RETRY_DELAY);
    logger.info(`🔄 Retry attempt ${retryCount} of ${MAX_RETRIES} in ${timeout/1000} seconds...`);
    await new Promise(resolve => setTimeout(resolve, timeout));
    return connectDB();
  } else {
    logger.error(`❌ Failed to connect after ${MAX_RETRIES} attempts. Please check MongoDB installation and configuration.`);
    process.exit(1);
  }
};

const setupConnectionHandlers = () => {
  const connection = mongoose.connection;
  
  connection.on('connected', () => {
    isConnecting = false;
    retryCount = 0;
    logger.info('✅ MongoDB connection established');
  });

  connection.on('disconnected', () => {
    logger.warn('❌ MongoDB disconnected');
    if (!isConnecting && !connection._closeCalled) {
      connectDB();
    }
  });

  connection.on('error', (error) => {
    logger.error('❌ MongoDB connection error:', error);
    if (!isConnecting && !connection._closeCalled) {
      connectDB();
    }
  });

  // Handle process termination
  const gracefulShutdown = async (signal) => {
    try {
      logger.info(`🛑 Received ${signal}. Starting graceful shutdown...`);
      await closeConnection();
      logger.info('👋 Process terminated gracefully');
      process.exit(0);
    } catch (err) {
      logger.error('❌ Error during graceful shutdown:', err);
      process.exit(1);
    }
  };

  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2')); // For nodemon restarts
};

const connectDB = async () => {
  if (isConnecting) return;
  isConnecting = true;

  try {
    logger.info('🔄 Attempting to connect to MongoDB...');
    
    // Close existing connection if any
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    // Verify MongoDB URI
    if (!process.env.MONGODB_URI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    await mongoose.connect(process.env.MONGODB_URI, dbOptions);
    logger.info('✅ Connected to MongoDB successfully');
    logger.info(`📦 Database: ${mongoose.connection.name}`);
    logger.info(`🔌 Host: ${mongoose.connection.host}`);
    
    setupConnectionHandlers();
    
  } catch (error) {
    isConnecting = false;
    await handleConnectionError(error);
  }
};

const closeConnection = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      logger.info('🔌 Closed MongoDB connection');
    }
    return true;
  } catch (err) {
    logger.error('❌ Error closing MongoDB connection:', err);
    return false;
  }
};

module.exports = {
  connectDB,
  closeConnection,
  dbOptions
}; 