import jwt, { decode } from 'jsonwebtoken';
import User from '../models/User.js';
import config from '../config.js';

export const signUp = async (req,res) => {
    const {username, email, password} = req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    const savedUser = await newUser.save();

    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400
    })

    res.status(200).json(token);
}

export const signIn = async (req,res) => {
    const {email, password} = req.body;
    const searchUserByEmail = await User.findOne({email});

    if(!searchUserByEmail) return res.status(400).json({message: "User doesnt exists"});

    const matchPassword = await User.comparePassword(password, searchUserByEmail.password);
    if(!matchPassword) return res.status(400).json({message: "Incorrect password"});

    const token = jwt.sign({id: searchUserByEmail._id}, config.SECRET, {
        //expiresIn: 86400
        expiresIn: 86400
    });

    res.status(200).json(token);

}

export const verifyToken = async (req,res) => {
    try {
    const token = req.headers['x-access-token'];
    const decodedToken = jwt.verify(token, config.SECRET);
    console.log(decodedToken);

    //if(Date.now() < (decodedToken.exp * 1000)) return res.status(200).json({message: "Authorized"});
    if(decodedToken) return res.status(200).json({message: "authorized"});
   } catch (error) {
    return res.status(401).json({message: "token expired"});
   }
}