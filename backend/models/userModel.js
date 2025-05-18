const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        min: 0,
        max: 120
    },
    experienceLevel: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Professional'],
        default: 'Beginner'
    },
    preferences: {
        notifications: {
            email: {
                type: Boolean,
                default: true
            },
            sms: {
                type: Boolean,
                default: false
            }
        },
        language: {
            type: String,
            default: 'en'
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'coach'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Add index for faster queries
userSchema.index({ firebaseUid: 1 });
userSchema.index({ email: 1 });

// Instance method to get public profile
userSchema.methods.getPublicProfile = function() {
    return {
        id: this._id,
        fullName: this.fullName,
        photoURL: this.photoURL,
        role: this.role
    };
};

const User = mongoose.model('User', userSchema);

module.exports = User;