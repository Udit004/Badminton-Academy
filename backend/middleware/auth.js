const admin = require('firebase-admin');

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        // Check if header exists
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        // Verify header format using case-insensitive regex
        const tokenMatch = authHeader.match(/^Bearer (.+)$/i);
        if (!tokenMatch) {
            return res.status(401).json({ 
                message: 'Invalid authorization format. Use: Bearer <token>' 
            });
        }

        const token = tokenMatch[1];
        const decodedToken = await admin.auth().verifyIdToken(token);
        
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ 
            message: error.code === 'auth/id-token-expired' 
                   ? 'Token expired' 
                   : 'Invalid authentication token' 
        });
    }
};

module.exports = verifyToken;