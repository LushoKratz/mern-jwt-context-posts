import React, { useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../context/GlobalContext';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required()
}).required();

export default function PostForm() {
  const context = useContext(GlobalContext);
  const [post, setPost] = useState([]);
  const {addPost, updatePostById, getPost} = context;
  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

const onSubmit = async (data) => {
  if(params.id){
    data = {_id: post._id, title: data.title, description: data.description};
    //console.log(data);
    updatePostById(data);
  }else{
    addPost(data);
  }
  navigate('/');
}

const handleChange = async (e) => {
  setPost({...post, [e.target.name]: e.target.value})
  //console.log(post)
}

useEffect(() => {
  const fetchPostById = async () => {
    if(params.id){
      //console.log(params.id)
      const res = await getPost(params.id);
      //setPost({title: res.})
      setPost({
        _id: res.data[0]._id,
        title: res.data[0].title,
        description: res.data[0].description
      })

    }
  }
  fetchPostById();
}, [params.id])


  return (
    <div className='p-5'>
        <NavLink to='/' className='text-white bg-primary px-5 py-2 rounded shadow '><b>Return</b></NavLink>
        <div className='bg-secondary container mt-5 p-3 rounded shadow'>
        <h2 className='text-white mt-2'>{params.id ? 'Edit post': 'Create post'}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='form-group bg-secondary p-3'>
            <label htmlFor="title" className=' text-white'>Title:</label>
            <input {...register("title", { required: true})} value={post.title || ''} onChange={handleChange} className='form-control' placeholder='Title' /> <br />
            {errors.title?.type === 'required' && <h6 className="text-white bg-danger px-5 py-1 font-weight-bold">Title is required</h6>}
            <label htmlFor="description" className='text-font-bold text-white'>Description:</label>
            <textarea {...register("description", {required: true})} value={post.description || ''} onChange={handleChange} className='form-control' placeholder='Description'></textarea><br />
            {errors.description?.type === 'required' && <h6 className="text-white bg-danger px-5 py-1 font-weight-bold">Description is required</h6>}
            <button type='submit' className='bt btn-primary px-5 py-1 rounded font-weight-bold shadow text-right'><b>{params.id ? 'Edit post': 'Create new post'}</b></button>
        </form>

        <br />
    </div>
    </div>
  )
}
