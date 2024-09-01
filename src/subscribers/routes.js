const express = require('express');
const authMiddleware = require('../middleware/auth');
const authorizeSubscriber = require('./authorizeSubscriber');
const getAuthorizedSubscribers = require('./getAuthorizedSubscribers');
const addNewSubscriber = require('./addNewSubscriber');
const deleteSubscriber = require('./deleteSubscriber');
const sendNewsletterToAuthorizedSubscribers = require('./sendNewsletterToAuthorizedSubscribers');

const router = express.Router();

// URLS
/**
 * @danger Ensure req limitter is set, due to possible token brute-force attacks
 * @apiurl /api/subscribers/confirm/:token
 */
router.get('/confirm/:token', authorizeSubscriber);

/**
 * @danger This endpoint can be used in malevolent way, thus limiter is a must in this scenario.
 * @apiurl /api/subscribers/
 */
router.post('/', addNewSubscriber);

/** @apiurl /api/subscribers/ */
router.get('/', authMiddleware, getAuthorizedSubscribers);

/** @apiurl /api/subscribers/:id */
router.delete('/:id', authMiddleware, deleteSubscriber);

/**
 * @danger Ensure to send newletter only to authorized subscribers.
 * @apiurl /api/subscribers/send
 */
router.post('/send', authMiddleware, sendNewsletterToAuthorizedSubscribers);

module.exports = router;
