const User = require('../models/User');

class UserController {
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).json({ success: true, message: 'User created successfully', data: user });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json({ success: true, message: 'Users retrieved successfully', data: users });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await User.update(req.body, { where: { id } });
            if (updated) {
                const updatedUser = await User.findOne({ where: { id } });
                res.status(200).json({ success: true, message: 'User updated successfully', data: updatedUser });
            } else {
                res.status(404).json({ success: false, message: 'User not found' });
            }
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const deleted = await User.destroy({ where: { id } });
            if (deleted) {
                res.status(200).json({ success: true, message: 'User deleted successfully' });
            } else {
                res.status(404).json({ success: false, message: 'User not found' });
            }
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
}

module.exports = new UserController();
