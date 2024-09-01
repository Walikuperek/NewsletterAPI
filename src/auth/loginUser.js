const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../database');

async function loginUser(req, res) {
    const { username, password } = req.body;
    const userRepo = new User();

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const user = await userRepo.getByUsername(username);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.json({ message: 'Logged in successfully', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = loginUser;
