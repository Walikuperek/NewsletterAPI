const db = require('./db');

/**
 * @typedef UserEntity
 * @property {number} id
 * @property {string} username
 * @property {string} password
 */

class UserRepository {
    /**
     * @param {string} username 
     * @param {string} password 
     * @returns {Promise<number>} Created user ID. 
     */
    async create(username, password) {
        const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        return result.insertId;
    }

    /**
     * @param {string} username 
     * @returns {Promise<UserEntity | null>} User.
     */
    async getByUsername(username) {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows.length ? rows[0] : null;
    }
}

module.exports = UserRepository;
