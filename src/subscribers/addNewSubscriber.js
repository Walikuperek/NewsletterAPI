const email = require('../email');
const jwt = require('jsonwebtoken');
const { Subscriber } = require('../database');

async function addNewSubscriber(req, res) {
    const { email, name } = req.body;
    const subscriberRepo = new Subscriber();

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const existingSubscriber = await subscriberRepo.getByEmail(email);
        if (existingSubscriber) {
            return res.status(400).json({ message: 'Subscriber already exists' });
        }

        const subscriberId = await subscriberRepo.create(email, name);
        const token = jwt.sign({ id: subscriberId }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

        await sendConfirmationEmail(email, token);
        res.status(201).json({ message: 'Subscription added. Please check your email to confirm your subscription.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/**
 * @param {string} to valid email
 * @param {string} token subscriber encoded as JWT
 */
async function sendConfirmationEmail(to, token) {
    const confirmUrl = `${process.env.APP_URL}/api/subscribers/confirm/${token}`;
    const mailOptions = {
        to,
        subject: 'Confirm your subscription',
        text: `Click the following link to confirm your subscription: ${confirmUrl}.\n\nIgnore this email if this was not your intention to register at newsletter.`,
        onDone: responseText => console.log(`Confirmation email sent to ${to}:`, responseText),
        onError: err => console.error(`Error sending confirmation email to ${to}:`, err)
    };
    await email.send(mailOptions);
}

module.exports = addNewSubscriber;
