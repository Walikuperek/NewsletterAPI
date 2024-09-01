const rateLimit = require('express-rate-limit');

const ONE_MINUTE_IN_MS = 60 * 1000;
const ONE_HUNDRED_REQUESTS_PER_IP = 100;

/**
 * Middleware: Rate limiter for requests.
 * @max 100
 * @per one minute
 */
const limiterMiddleware = rateLimit({
    windowMs: ONE_MINUTE_IN_MS,
    max: ONE_HUNDRED_REQUESTS_PER_IP,
    message: 'Too many requests.',
    statusCode: 429,
    headers: true
  });

module.exports = limiterMiddleware;
