const db = require('./db');

/**
 * @typedef SubscriberEntity
 * @property {number} id
 * @property {string} email
 * @property {string} name
 */

class SubscriberRepository {
    /**
     * @param {number} id 
     * @returns Whether subscriber was authorized.
     */
    async authorize(id) {
        const [result] = await db.query('UPDATE subscribers SET authorized = true WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
    
    /**
     * @param {string} email 
     * @param {string} name
     * @returns {Promise<string>} ID of the created subscriber.
     */
    async create(email, name) {
        const [result] = await db.query('INSERT INTO subscribers (email, name) VALUES (?, ?)', [email, name]);
        return result.insertId;
    }

    /**
     * @param {string} id 
     * @returns Whether subscriber was deleted.
     */
    async delete(id) {
        const [result] = await db.query('DELETE FROM subscribers WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
    
    /**
     * @returns {Promise<SubscriberEntity[]>} List of authorized subscribers.
     */
    async getAuthorizedSubscribers() {
        const [rows] = await db.query('SELECT email FROM subscribers WHERE authorized = true');
        return rows;
    }

    /**
     * @param {string} email 
     * @returns {Promise<SubscriberEntity | null>} Subscriber.
     */
    async getByEmail(email) {
        const [rows] = await db.query('SELECT * FROM subscribers WHERE email = ?', [email]);
        return rows.length ? rows[0] : null;
    }
}

module.exports = SubscriberRepository;
