import React, { useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useUserAuth } from '../context/AuthContext'
import { GlobalContext } from '../context/GlobalContext';
import Swal from 'sweetalert2';

export default function Home() {
  const {logout, authorized} = useUserAuth();

  const context = useContext(GlobalContext);
  const {state, getAllPosts, deletePost} = context;
  //console.log(state)

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure you want delete this post?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        deletePost(id);
      }
    });
  }

  useEffect(() => {
    getAllPosts();
  }, [])
  

  return (
    <div className='text-bold'>
              <nav className='d-flex justify-content-around p-3 bg-dark text-light'>
              <h3 className='font-weight-bold'>MERN-JWT-POSTS</h3>
              <div>
                <NavLink to='/create-post' className='btn btn-success m-2'>
                  Create Post
                </NavLink>
                <button onClick={() => logout()} className='btn btn-danger'>
                  Logout
                </button>
              </div>
            </nav>

            <div className='container d-flex flex-wrap mt-4'>
              {state.posts.length > 0 ? state.posts.map(post => (
                <div key={post._id} className="card m-4 rounded shadow">
                  <div className='card-body'>
                    <h2 className='card-title'>{post.title}</h2>
                    <p className='card-text'>{post.description}</p>
                    <NavLink to={`/update-post/${post._id}`} className='btn btn-primary px-4'>Edit</NavLink>
                    <button onClick={() => handleDelete(post._id)} className='btn btn-danger px-4'>Delete</button>
                  </div>
                </div>
              )) : <h2>loading...</h2> }
            </div>
    </div>
  )
}
