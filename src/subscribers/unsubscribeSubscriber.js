const jwt = require('jsonwebtoken');
const { Subscriber } = require('../database');

async function unsubscribeSubscriber(req, res) {
    const { token } = req.params;
    const subscriberRepo = new Subscriber();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const isUnsubscribed = await subscriberRepo.delete(decoded.id);

        if (!isUnsubscribed) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }

        res.json({ message: 'Subscription confirmed successfully!' });
    } catch (err) {
        res.status(400).json({ error: 'Invalid or expired token.' });
    }
}

module.exports = unsubscribeSubscriber;
