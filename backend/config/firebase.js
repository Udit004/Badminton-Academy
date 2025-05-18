const admin = require('firebase-admin');

// Initialize Firebase Admin with service account
try {
    // In production, use environment variables for credentials
    const serviceAccount = require('../serviceAccountKey.json');
    
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    
    console.log('Firebase Admin initialized successfully');
} catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    // Don't exit the process, but make sure to handle the error appropriately
}

module.exports = admin;