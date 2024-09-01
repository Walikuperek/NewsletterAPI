const express = require('express');
const authMiddleware = require('../middleware/auth');
const loginUser = require('./loginUser');
const registerNewUser = require('./registerNewUser');

const router = express.Router();

// URLS
/** @apiurl /api/auth/login */
router.post('/login', loginUser);

/**
 * If no other than admin accounts, then only
 * admin can add user (admin should be inserted with DB provider based on .env creds).
 * @apiurl /api/auth/register
 */
router.post('/register', authMiddleware, registerNewUser);

module.exports = router;
