const admin = require('firebase-admin');
const User = require('../models/userModel');



class UserController {
    static async createProfile(req, res) { // Handles create or update
        try {
            const userId = req.params.uid;
            const { name, phone, address, age, experience } = req.body; // Use frontend field names

            let user = await User.findOne({ firebaseUid: userId });

            const profileDataToSave = {
                firebaseUid: userId,
                email: req.user.email, // Get email from Firebase token
                fullName: name,        // Map to DB field name
                phoneNumber: phone,    // Map to DB field name
                address,
                age,
                experienceLevel: experience // Map to DB field name
            };

            if (!user) {
                // Create new user in MongoDB
                user = new User(profileDataToSave);
                await user.save();
                res.status(201).json({
                    message: 'User profile created successfully',
                    profile: {
                        name: user.fullName,
                        email: user.email,
                        phone: user.phoneNumber,
                        address: user.address,
                        age: user.age,
                        experience: user.experienceLevel,
                        uid: user.firebaseUid
                    }
                });
            } else {
                // Update existing user in MongoDB
                user.fullName = name !== undefined ? name : user.fullName;
                user.phoneNumber = phone !== undefined ? phone : user.phoneNumber;
                user.address = address !== undefined ? address : user.address;
                user.age = age !== undefined ? age : user.age;
                user.experienceLevel = experience !== undefined ? experience : user.experienceLevel;
                if (req.user.email && user.email !== req.user.email) {
                    user.email = req.user.email; // Sync email if different
                }
                await user.save();
                res.json({
                    message: 'User profile updated successfully',
                    profile: {
                        name: user.fullName,
                        email: user.email,
                        phone: user.phoneNumber,
                        address: user.address,
                        age: user.age,
                        experience: user.experienceLevel,
                        uid: user.firebaseUid
                    }
                });
            }
        } catch (error) {
            console.error('Error creating/updating user profile:', error);
            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: 'Validation Error', errors: error.errors });
            }
            res.status(500).json({ message: 'Error creating/updating user profile' });
        }
    }

    // Get user profile from MongoDB
    static async getProfile(req, res) {
        try {
            const userId = req.params.uid; // UID from authenticated Firebase user
            const userInDb = await User.findOne({ firebaseUid: userId });

            if (userInDb) {
                res.json({
                    name: userInDb.fullName || '',
                    email: userInDb.email || req.user.email, // Prefer DB email, fallback to token email
                    phone: userInDb.phoneNumber || '',
                    address: userInDb.address || '',
                    age: userInDb.age !== null && userInDb.age !== undefined ? userInDb.age : '', // Ensure age is not null/undefined
                    experience: userInDb.experienceLevel || 'Beginner',
                    uid: userId
                });
            } else {
                // Profile not found in MongoDB, return default structure with 404
                res.status(404).json({
                    message: 'Profile not found. Please complete your profile.',
                    name: '',
                    phone: '',
                    address: '',
                    age: '',
                    experience: 'Beginner',
                    email: req.user.email, // Email from token for new profile form
                    uid: userId
                });
            }
        } catch (error) {
            console.error('Error fetching user profile from MongoDB:', error);
            res.status(500).json({ message: 'Error fetching user profile' });
        }
    }
}

module.exports = UserController;