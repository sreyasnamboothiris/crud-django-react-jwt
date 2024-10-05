import React, { useEffect } from 'react'
import AdminHeader from '../../Components/AdminComponents/AdminHeader'
import AdminNavbar from '../../Components/AdminComponents/AdminNavbar'
import AdminHome from '../../Components/AdminComponents/AdminHome'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

function Admin() {

  const navigate = useNavigate()
  const user = useSelector((state)=>state.user.user)
  console.log(user)
  useEffect(()=>{
    if(!user ||  !user.is_superuser){
     
      navigate('/')
    }
    else{
      
    }
  },[])
  return (
    <div>
      <AdminHeader/>
      <div className='flex flex-row p-2 gap-2'>

      <AdminNavbar/>
      <AdminHome/>
      </div>
      
    </div>
  )
}

export default Admin
