const { Subscriber } = require('../database');

async function deleteSubscriber(req, res) {
    const { id } = req.params;
    const subscriberRepo = new Subscriber();

    try {
        const isDeleted = await subscriberRepo.delete(id);

        if (!isDeleted) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }

        res.json({ message: 'Subscriber removed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = deleteSubscriber;
