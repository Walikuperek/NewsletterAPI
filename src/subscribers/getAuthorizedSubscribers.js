const { Subscriber } = require('../database');

async function getAuthorizedSubscribers(req, res) {
    const subscriberRepo = new Subscriber();
    try {
        const subscribers = await subscriberRepo.getAuthorizedSubscribers();
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = getAuthorizedSubscribers;
