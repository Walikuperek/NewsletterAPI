const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

(async () => {
    try {
        const connection = await db.getConnection();

        await connection.query(`
            CREATE TABLE IF NOT EXISTS subscribers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                name VARCHAR(255),
                authorized BOOLEAN DEFAULT false
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `);

        const defaultUsername = process.env.USER_NAME;
        const defaultPassword = process.env.USER_PASSWORD;

        const [rows] = await connection.query(`
            SELECT * FROM users WHERE username = '${defaultUsername}'
        `);

        if (rows.length === 0) {
            const hashedPassword = bcrypt.hashSync(defaultPassword); // we can make simple sync call, it's only once per server start ;)

            await connection.query(`
                INSERT INTO users (username, password) VALUES (?, ?)
            `, [defaultUsername, hashedPassword]);
        }

        connection.release();
    } catch (err) {
        console.error('Database error:', err);
    }
})();

module.exports = db;
