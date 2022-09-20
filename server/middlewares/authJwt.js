import config from '../config.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const verifyDuplicatedEmailOrUser = async (req,res, next) => {
    const {username, email} = req.body;
    const searchUser = await User.findOne({username: username});

    if(searchUser) return res.status(400).json({message: "User already exists"});

    const searchEmail = await User.findOne({email: email});

    if(searchEmail) return res.status(400).json({message: "Email already exists"});

    next();
} 

export const verifyToken = async (req,res,next) => {
    try {
        const token = req.headers["x-access-token"];
        if(!token) return res.status(403).json({message: "No token provided"});
        const decodedToken = jwt.verify(token, config.SECRET);
        req.userId = decodedToken.id;
        const user = await User.findById(req.userId, {password: 0});
        if(!user) return res.status(404).json({message: "No user found"});
        next();
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized'})
    }
}