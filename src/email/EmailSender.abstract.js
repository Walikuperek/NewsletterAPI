/**
 * @typedef {Object} EmailNotSendedMsg
 * @property {string} err - Error message when email is not sent.
 */

/**
 * @typedef {Object} EmailSendedMsg
 * @property {string} msg - Success message when email is sent.
 */

/**
 * @typedef {Object} SendTextMessageOptions
 * @property {string} to - Recipient's email address.
 * @property {string} subject - Subject of the email.
 * @property {string} text - Body of the email.
 * @property {(msg: EmailSendedMsg) => void} [onDone] - Callback function called when email is successfully sent.
 * @property {(err: EmailNotSendedMsg) => void} [onError] - Callback function called when email fails to send.
 */

/** Base sender for your needs ;) */
class EmailSender {
    /**
     * Sends an email text message.
     * @param {SendTextMessageOptions} options - Options for sending the email.
     * @throws {Error} When the method is not implemented.
     */
    async send({ to, subject, text, onDone = msg => {}, onError = err => {} }) {
        throw new Error('Not implemented');
    }
}

module.exports = EmailSender;
