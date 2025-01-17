const net = require('net');
const { logger } = require('./logger');
const { closeConnection } = require('./database');

const findAvailablePort = async (startPort) => {
  const maxPort = 65535;
  const basePort = parseInt(startPort, 10);

  if (isNaN(basePort) || basePort < 0 || basePort >= maxPort) {
    return 3000; // fallback to default port
  }

  const tryPort = async (port) => {
    return new Promise((resolve, reject) => {
      const server = net.createServer();
      server.unref();
      
      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          const nextPort = port + 1;
          if (nextPort < maxPort) {
            logger.warn(`Port ${port} in use, trying next port`);
            resolve(tryPort(nextPort));
          } else {
            resolve(3000);
          }
        } else {
          reject(err);
        }
      });

      server.listen(port, () => {
        server.close(() => {
          resolve(port);
        });
      });
    });
  };

  return tryPort(basePort);
};

const setupGracefulShutdown = (server) => {
  const shutdown = async (signal) => {
    logger.info(`🛑 ${signal} received. Shutting down gracefully...`);
    
    const forceExit = setTimeout(() => {
      logger.error(`⚠️ Could not close connections in time (${signal}), forcefully shutting down`);
      process.exit(1);
    }, 10000);

    try {
      // Close express server
      await new Promise((resolve) => {
        server.close(resolve);
        logger.info('🔌 Closed express server');
      });

      // Close database connection
      await closeConnection();
      
      clearTimeout(forceExit);
      process.exit(0);
    } catch (err) {
      logger.error('❌ Error during shutdown:', err);
      clearTimeout(forceExit);
      process.exit(1);
    }
  };

  // Handle different termination signals
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

module.exports = {
  findAvailablePort,
  setupGracefulShutdown
}; 