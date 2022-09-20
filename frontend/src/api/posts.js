import axios from "axios";

export const createPost = async (newPost) => await axios.post(`${process.env.REACT_APP_BACKEND_URI}/posts/`,newPost, {headers:{'x-access-token': JSON.parse(window.localStorage.getItem('x-access-token'))}});

export const getPosts = async () => await axios.get(`${process.env.REACT_APP_BACKEND_URI}/posts/`, {headers:{'x-access-token': JSON.parse(window.localStorage.getItem('x-access-token'))}});

export const getPostById = async (id) => await axios.get(`${process.env.REACT_APP_BACKEND_URI}/posts/${id}`, {headers:{'x-access-token': JSON.parse(window.localStorage.getItem('x-access-token'))}});

export const updatePost = async (post) => await axios.put(`${process.env.REACT_APP_BACKEND_URI}/posts/${post._id}`,post, {headers:{'x-access-token': JSON.parse(window.localStorage.getItem('x-access-token'))}});

export const destroyPost = async (id) => await axios.delete(`${process.env.REACT_APP_BACKEND_URI}/posts/${id}`,{headers:{'x-access-token': JSON.parse(window.localStorage.getItem('x-access-token'))}});