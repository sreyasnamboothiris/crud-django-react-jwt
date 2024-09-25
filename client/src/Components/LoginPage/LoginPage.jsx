import React, { useContext } from 'react'
import Heading from './Heading'
import Form from './Form'
import { LoginStateContext } from '../../context/LoginStateProveder'

function LoginPage() {
  const {isAdmin,isSignup} = useContext(LoginStateContext);
  return (
    <div className='flex items-center flex-col justify-center p-3 bg-[#3C0B63]'>
      <Heading/>
      <p className="text-white font-semibold text-xl">
        {isSignup ? 'Please sign up to create your account' : 'Please login to continue'}
      </p>
      <Form/>
    </div>
  )
}

export default LoginPage
