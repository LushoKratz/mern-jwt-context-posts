import Post from '../models/Post.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import * as Yup from 'yup';

export const getAllPosts = async (req,res) => {
    const token = req.headers['x-access-token'];
    const decodedToken = jwt.verify(token, config.SECRET);
    try {
        //const getPosts = await Post.find();
        const getPostById = await Post.find({userId: decodedToken.id});
        return res.status(201).json(getPostById);
    } catch (error) {
        return res.status(400).json({message: "Couldnt get posts"});
    }
}

export const getPostById = async (req,res) => {
    const {postId} = req.params;
    const token = req.headers['x-access-token'];
    const decodedToken = jwt.verify(token, config.SECRET);
    try {
        const getPostById = await Post.find({_id: postId, userId: decodedToken.id});
        if(getPostById.length > 0) return res.status(201).json(getPostById);
        next();
    } catch (error) {
        return res.status(403).json({message: "Couldnt find post"});
    }
}

export const createPost = async (req,res) => {
    const {title, description} = req.body;
    const token = req.headers['x-access-token'];
    const decodedToken = jwt.verify(token, config.SECRET);

    const newPost = new Post({
        title,
        description,
        userId: decodedToken.id
    })

    const savedPost = await newPost.save();

    if(!savedPost) return res.status(400).json({message: 'An error ocurred while saving post'});

    res.status(200).json(savedPost);
}

export const updatePost = async (req,res) =>{
    const {postId} = req.params;
    const {title, description} = req.body;
    const token = req.headers['x-access-token'];
    const decodedToken = jwt.verify(token, config.SECRET);

    try {
        const updatedPost = await Post.findOneAndUpdate({_id: postId, userId: decodedToken.id}, {title:title, description}, {new: true})
        if(!updatedPost) return res.status(401).json({message: "Error updating post"});
        return res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(400).json({message: "Couldnt update post"});
    }

}

export const deletePost = async (req,res) => {
    const {postId} = req.params;
    const decodedToken = jwt.verify(req.headers['x-access-token'], config.SECRET);
    const deletePost = await Post.findOneAndDelete({_id: postId, userId: decodedToken.id});

    if(!deletePost) return res.status(401).json({message: "Error deleting post"})

    return res.status(203).json();
}
