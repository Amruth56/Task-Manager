const express = require('express');
const { updatePassword } = require('../controllers/userController');

const userRouter = express.Router();

// PUBLIC ROUTES
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser );

// PRIVATE ROUTES
userRouter.get('/me', getCurrentUser);
userRouter.put('/profile', updateProfile);
userRouter.put('/password', updatePassword)