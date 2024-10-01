import React from 'react'
import './Login.css'
import LoginPage from '../../Components/LoginPage/LoginPage'
import { LoginStateProvider } from '../../context/LoginStateProveder';

function Login() {
  return (
    <div className='bg-[#3C0B63] ' style={{ height: '150vh' }}>
      <LoginStateProvider>
        <LoginPage/>
       </LoginStateProvider>
      
    </div>
  )
}

export default Login
