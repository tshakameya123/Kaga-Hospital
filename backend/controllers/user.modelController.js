const Users = require('../models/user.model.js');
const bcrypt = require('bcryptjs');

// Create a new user
exports.createUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let hashedPassword = password;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Users({
            name,
            email,
            password: hashedPassword,
            role
        });

        const savedUser = await newUser.save();

        // Never return password
        const cleanUser = savedUser.toObject();
        delete cleanUser.password;

        res.status(201).json(cleanUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server Error: Unable to create user' });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await Users.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server Error: Unable to fetch users' });
    }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server Error: Unable to fetch user' });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const updateData = { ...req.body };

        // If password is being updated, hash it
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }

        const updatedUser = await Users.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server Error: Unable to update user' });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await Users.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server Error: Unable to delete user' });
    }
};

