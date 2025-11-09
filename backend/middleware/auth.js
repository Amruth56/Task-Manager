const jwt = require('jsonwebtoken')
import User from '../models/userModel.js'

const JWT_SECRET = process.env.JWT_SECRET;


export default async function authMiddleware(req, res, next){
    // grab bearer token from header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startswith('Bearer')){
        return res.status(401).json({
            success: false, 
            message: "Not authorized, token missing"
        });
    }

    const token = authHeader.split(' ')[1];

    // verify and attach user object
}