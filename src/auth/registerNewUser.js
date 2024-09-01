const bcrypt = require('bcryptjs');
const { User } = require('../database');

async function registerNewUser(req, res) {
    const { username, password } = req.body;
    const userRepo = new User();

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        await userRepo.create(username, hashedPassword);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = registerNewUser;
