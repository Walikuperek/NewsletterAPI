const email = require('../email');
const { Subscriber } = require('../database');

async function sendNewsletterToAuthorizedSubscribers(req, res) {
    const { subject, message } = req.body;
    const subscriberRepo = new Subscriber();

    if (!subject || !message) {
        return res.status(400).json({ message: 'Subject and message are required' });
    }

    try {
        const subscribers = await subscriberRepo.getAuthorizedSubscribers();

        for (const subscriber of subscribers) {
            await sendNewsletterEmail(subscriber.email, subject, message);
        }

        res.json({ message: 'Newsletter sent successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/**
 * 
 * @param {string} to valid email
 * @param {string} subject
 * @param {string} text Newsletter message
 */
async function sendNewsletterEmail(to, subject, text) {
    const unsubscribeUrl = `${process.env.APP_URL}/api/subscribers/unsubscribe/${token}`;
    const mailOptions = {
        to,
        subject,
        text: text + `\n\nUnsubscribe permanently by clicking this link: ${unsubscribeUrl}.`,
        onDone: responseText => console.log(`sent Newsletter to ${to}:`, responseText),
        onError: err => console.error(`Error sending Newsletter to ${to}:`, err)
    };
    await email.send(mailOptions);
}

module.exports = sendNewsletterToAuthorizedSubscribers;
