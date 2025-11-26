const Users = require('../models/user.model');
const Patient = require('../models/patient.model');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    res.status(statusCode).json({
        success: true,
        token,
        user: userResponse
    });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, username, dateOfBirth, gender, phoneNumber, address } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email and password'
            });
        }

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        const user = await Users.create({
            name,
            email,
            password,
            role: 'patient'
        });

        const patient = await Patient.create({
            user: user._id,
            dateOfBirth: dateOfBirth || null,
            gender: gender || null,
            phoneNumber: phoneNumber || null,
            address: address || null,
            medicalHistory: ''
        });

        createSendToken(user, 201, res);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating user account',
            error: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        const user = await Users.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        createSendToken(user, 200, res);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error.message
        });
    }
};

exports.doctorLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide username and password'
            });
        }

        const user = await Users.findOne({
            name: { $regex: new RegExp(username, 'i') },
            role: 'doctor'
        });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid doctor credentials'
            });
        }

        createSendToken(user, 200, res);
    } catch (error) {
        console.error('Doctor login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error.message
        });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).select('-password');
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user data'
        });
    }
};

exports.logout = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};
