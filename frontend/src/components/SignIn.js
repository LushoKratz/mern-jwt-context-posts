import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import {useUserAuth } from '../context/AuthContext';

const schema = yup.object({
    email: yup.string().required().email('Invalid email'),
    password: yup.string().required()
}).required();


export default function SignIn() {
    const navigate = useNavigate();
    const {login, loading, error, setError, setLoading, authorize} = useUserAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    
    const onSubmit = async (data) => {
            await login(data);
    }

    useEffect(() => {
        setError('');
    }, [])
    

    //console.log(watch("email")); 
  return (
    <div className="row center overflow-hidden" style={{width: '100%', background: '#ECECEC'}}>
        <div className="col-4 p-5">
            <form onSubmit={handleSubmit(onSubmit)} className='form-group mt-5'>
                <h1  className="mt-5">Login to mern app</h1><br />
                <h2 className="text-danger">{error && error}</h2>
                <label htmlFor="email" className="label">Email:</label>
                <input {...register("email", { required: true})} className='form-control' placeholder="example@example.com"/>
                {errors.email?.type === 'required' && <h6 className="text-danger font-weight-bold">This field is required</h6>}
                {errors.email?.type === 'email' && <h6 className="text-danger font-weight-bold">Email is incorrect</h6>}
                <br />
                <label htmlFor="password" className="mt-4 label">Password:</label>
                <input {...register("password", { required: true })} className='form-control' placeholder="password"/>
                {errors.password && <h6 className="text-danger font-weight-bold">This field is required</h6>}
                <br />
                <button type="submit" className={`btn btn-primary mt-4 px-5 ${loading && 'disabled'}`}>Login</button>
            </form><br /><br />
            <NavLink to='/signUp'>Doesnt have an account yet? Register here!</NavLink>
        </div>

        <div className="col-8 bg-image p-5 text-center shadow rounded text-white" style={{backgroundImage: `url('https://mdbcdn.b-cdn.net/img/new/slides/003.webp')`, height: '100vh'}}>
            <h1 className="mb-3 h2">MERN-Jwt-Crud Posts App</h1>

            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus praesentium
                labore accusamus sequi, voluptate debitis tenetur in deleniti possimus modi voluptatum
                neque maiores dolorem unde? Aut dolorum quod excepturi fugit.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus praesentium
                labore accusamus sequi, voluptate debitis tenetur in deleniti possimus modi voluptatum
                neque maiores dolorem unde? Aut dolorum quod excepturi fugit.
            </p>
        </div>
    </div>
  )
}
