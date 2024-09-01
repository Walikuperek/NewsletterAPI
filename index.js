const express = require('express');
const bodyParser = require('body-parser');
const limiter = require('./src/middleware/rateLimiter');
const authRouter = require('./src/auth/routes');
const subscribersRouter = require('./src/subscribers/routes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(limiter);
app.use(bodyParser.json());

// Routing
app.use('/api/subscribers', subscribersRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
