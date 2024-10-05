import React, { useEffect } from 'react'
import Header from '../../Components/HomePage/Header'
import HomePage from '../../Components/HomePage/HomePage.jsx'
import { useSelector } from 'react-redux'
import { useNavigate,useHistory } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  

  const isAuth = useSelector((state)=>{
    return state.auth.isAuth
  })
 
  useEffect(()=>{
    if(isAuth === null){
      navigate('/');
    } 
  })
  return (
    <div className='h-screen w-screen bg-[#814EC3]]'>
      
      <Header/>
      <HomePage/>
    </div>
  )
}

export default Home
