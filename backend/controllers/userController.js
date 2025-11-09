import userModel from '../models/userModel';
import User from '../models/userModel'
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRES = '24h';

const createToken = (userId) => jwt.sign({
    id: userId
},  JWT_SECRET, {
    expiresIn: TOKEN_EXPIRES
})

// Register Function 
export const registerUser = async (req, res) => {
    const {name, email,  password} = req.body;
    
    if(!name || !email || !password) {
        return res.status(400).json({success: false, message: "All fields are required"})
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({
            success: false,
            message: "invalid Email"
        });
    }
    if(password.length < 8){
        return res.status(400).json({
            success: false,
            message: "Password length needs to be greater than 8"
        });
    }

    try{
        if(await user.findOne({email})){
            return res.status(409).json({success: false, message: "User already exists"});
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password:hashed});
        const token = createToken(user._id);

        res.status(201).json({success:true, token, user:{
            id: user._id, 
            name:user.name,
            email: user.email
        }});
    } catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "Server Error"})
    }
};

// LOGIN FUNCTION
export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    if(!email  || !password) {
        return res.status(400).json({
            success: false, 
            message: "Both Email and Password are required"
        });
    }
       try{
            const user = await user.findOne({email});
            if(!user){
                return res.status(401).json({
                    success: false,
                    message: "Invalid Credentials"
                })
            }
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                return res.status(401).json({
                    success: false,
                    message: "Invalid Credentials"
                })
            }
            const token = createToken(user._id);
            res.json({
                success: true,
                token, 
                user: { id: user._id, name: user.name, email: user.email}
            });
        } catch(err){
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Server Error"
            })
        }
}