const { LoggingWinston } = require('@google-cloud/logging-winston');
const winston = require('winston');

const loggingWinston = new LoggingWinston();

/**
 * Logging for GCP.
 * @example
 * ```
 * logger.info(`Request: ${req.method} ${req.url}`);
 * logger.error(`Error: ${err.message}`);
 * ```
 */
const logger = winston.createLogger({
  level: 'info', // You can set different types: 'error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'
  transports: [
    new winston.transports.Console(), // Logs will be visible in console as well
    loggingWinston
  ]
});

module.exports = logger;
