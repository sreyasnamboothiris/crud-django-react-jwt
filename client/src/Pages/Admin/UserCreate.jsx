import React, { useEffect, useRef, useState } from 'react'
import AdminHeader from '../../Components/AdminComponents/AdminHeader'
import AdminNavbar from '../../Components/AdminComponents/AdminNavbar'
import { useForm } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { submitBtn } from '../../Components/Button/buttons'
import api from '../../api'
import default_image from '../../assets/default_user.jpg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';


function UserCreate() {
  const {control, handleSubmit, formState: { errors },watch } = useForm()
  const user = useSelector((state)=>state.user.user);
  const token = useSelector((state)=>state.auth.isAuth)
  const navigate = useNavigate();

 
  useEffect(()=>{
    if(!user||!user.is_superuser||!token){
      navigate('/')
    }
  },[])
  
  const formHandle = (data)=>{
    console.log(data)
    
    api.post('/admin/users/',data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response=>{
      toast.success('Successfull added new user')

      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    }).catch(errors=>{
      toast.error('Failed to create')
      console.log(errors,toast)
    })
  }
  return (
    <div>
      <AdminHeader/>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <div className='flex flex-row p-2 gap-2'>

      <AdminNavbar/>
      <div className='flex flex-col justify-center items-center  gap-4 w-full'>
      
        <div className='m-4 mt-'><h1 className='text-3xl font-bold'>Create User</h1></div>
          <div>
          <form onSubmit={handleSubmit(formHandle)}>
          <div className="flex items-center flex-col p-3">
            
            
            <div className="flex flex-col">
              <div className="flex flex-col p-2 m-1">
                <label htmlFor="username">Enter User Name</label>
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: "Username is required",
                    minLength: {
                      value: 4,
                      message: 'username must be at least 4 characters long'
                    }
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="bg-[#A388EF] rounded"
                    />
                  )}
                />
                <div>{errors.username && (
                  <span className='text-red-500 text-sm absolute'>
                    {errors.username.message}
                  </span>
                )}</div>
              </div>
              <div className="flex flex-col p-2 m-1">
                <label htmlFor="email">Enter Email</label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required', 
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                      message: 'Invalid email format' 
                    },
                    maxLength: {
                      value: 50,
                      message: 'Email cannot exceed 50 characters'
                    },
                    validate: value => value.includes('@') || 'Email must contain @', 
                  }}
                  render={({ field }) => (
                    <input
                      type="email"
                      {...field}
                      className="bg-[#A388EF] rounded"
                    />
                  )}
                />
                <div>{errors.email && (
                  <span className='text-red-500 text-sm absolute'>
                    {errors.email.message}
                  </span>
                )}</div>
              </div>
              <div className="flex flex-col p-2 m-1">
                <label htmlFor="email">Enter Password</label>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long'
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                      message: 'Password must contain at least one letter and one number'
                    }
                  }}
                  render={({ field }) => (
                    <input
                      type="password"
                      {...field}
                      className="bg-[#A388EF] rounded"
                    />
                  )}
                />
                <div>
                {errors.password && (
                  <span className='text-red-500 text-sm absolute'>
                    {errors.password.message}
                  </span>
                )}
                </div>
              </div>
              
              <button type="submit" className={`mt-8 hover:bg-black ${submitBtn}`}>
                Submit
              </button>
            </div>
          </div>
        </form>
          </div>

      </div>
      </div>
      
    </div>
  )
}

export default UserCreate
