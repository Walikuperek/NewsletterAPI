const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const dbPath = path.resolve(__dirname, '../../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS subscribers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            name TEXT
        )
    `);
        
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `);

    const defaultUsername = process.env.USER_NAME;
    const defaultPassword = process.env.USER_PASSWORD;
    const hashedPassword = bcrypt.hashSync(defaultPassword);

    db.run(`
        INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)
    `, [defaultUsername, hashedPassword], (err) => {
        if (err) {
            console.error('Error creating default user:', err.message);
        }
    });
});

module.exports = db;
