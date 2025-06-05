const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const UserController = require('../controllers/userController');



router.put('/profile/create/:uid', verifyToken, UserController.createProfile);
// Get user profile (protected route)
router.get('/profile/:uid', verifyToken, UserController.getProfile);


module.exports = router;