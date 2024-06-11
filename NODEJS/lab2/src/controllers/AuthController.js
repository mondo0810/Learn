const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

class AuthController {
    async register(req, res) {
        const { email, password } = req.body;

        try {
            // Check if user with given email exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'User already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            const user = await User.create({ email, password: hashedPassword });

            res.status(201).json({ success: true, message: 'User registered successfully', data: user });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;

        try {
            // Check if user with given email exists
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }

            // Validate password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ success: true, message: 'Login successful', token });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
}

module.exports = new AuthController();
