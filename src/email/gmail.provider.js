const nodemailer = require('nodemailer');
const EmailSender = require('./EmailSender.abstract');

/**
 * Implementation of the email client, using nodemailer with gmail
 */
class GmailProvider extends EmailSender {
    constructor() {
        super();
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async send({ to, subject, text, onDone, onError }) {
        try {
            const info = await this.transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
            onDone(info.response);
        } catch (error) {
            onError(error);
        }
    }
}

module.exports = GmailProvider;
