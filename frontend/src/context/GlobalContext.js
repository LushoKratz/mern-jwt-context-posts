import {createContext, useEffect, useReducer} from 'react';
import { createPost, getPosts, destroyPost, updatePost , getPostById} from '../api/posts';
import { appReducer } from './AppReducer';

const initialState = {posts: []};
export const GlobalContext = createContext(initialState);

export const GlobalContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const addPost = async (post) => {
        const res = await createPost(post);
        dispatch({type: "ADD_POST", payload: res.data})
    }

    const getAllPosts = async () => {
        const rest = await getPosts();
        //console.log(rest.data);
        dispatch({type: "GET_POSTS", payload: rest.data});
    }

    const getPost = async (id) => {
        const res = await getPostById(id);
        return res;
    }

    const updatePostById = async (post) => {
        const res = await updatePost(post);
        dispatch({type: "UPDATE_POST", payload: post});
    }

    const deletePost = async (id) => {
        const res = await destroyPost(id);
        dispatch({type: "DELETE_POST", payload: id});
    }

    
    
    return <GlobalContext.Provider value={{state, addPost, getAllPosts, deletePost, updatePostById, getPost}}>
        {children}
    </GlobalContext.Provider>
}
