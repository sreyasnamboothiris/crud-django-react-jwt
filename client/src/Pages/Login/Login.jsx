import React, { useEffect } from 'react'
import './Login.css'
import LoginPage from '../../Components/LoginPage/LoginPage'
import { LoginStateProvider } from '../../context/LoginStateProveder';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  useEffect(()=>{
    if (isAuth){
      navigate('/home',{replace:true})
    }
  })
  return (
    <div className='bg-[#3C0B63] ' style={{ height: '150vh' }}>
      <LoginStateProvider>
        <LoginPage/>
       </LoginStateProvider>
      
    </div>
  )
}

export default Login
