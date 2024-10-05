import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { logedOut } from '../../Redux/authSlice';

function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleLogout = async () => {
    console.log('hre come')
    try {
     localStorage.clear()
      await api.post('/users/logout/',  {
        refresh_token: localStorage.getItem('refresh'),
      },
        {headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
     localStorage.clear();
      dispatch(logedOut())
      navigate('/');

    } catch (error) {
         console.log(error)
    }
  };
  return (
    <div className='flex flex-col mx-auto p-5 bg-gray-800'>
      <div className='flex justify-around'>
        <div className='text-2xl font-semibold text-white p-2'>
          <h1>Admin Dashboard</h1>
        </div>
        <div className='p-1 text-white flex justify-around gap-5 items-center'>
          <div className='px-3 border-2 rounded-[8px] border-sky-500 hover:bg-black cursor-pointer hover:-translate-1 hover:scale-110 duration-500 hover:shadow-md hover:shadow-black'><h1>Admin</h1></div>
          <button onClick={handleLogout} className='px-3 border-2 rounded-[8px] border-sky-500 hover:bg-black cursor-pointer hover:-translate-1 hover:scale-110 duration-500 hover:shadow-md hover:shadow-black'><h1>Logout</h1></button>
          
        </div>
      </div>
    </div>
  )
}

export default AdminHeader
