import React,{useEffect} from 'react';
import Buttons from '../Button/Button';
import { dummyBtn } from '../Button/buttons';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { useDispatch } from 'react-redux';
import { logedOut } from '../../Redux/authSlice';


function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleProfile = ()=>{
    navigate('/home/profile',{replace:true})
  }
  
  const logoutHandle = async () => {
  
    try {
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
    <div className='flex items-center justify-between p-4 bg-gray-800 text-white'>
      {/* Left Side Buttons */}
      <div className='flex space-x-4'>
      <Buttons content={'Home'} style={dummyBtn}/>
        <Buttons content={'About'} style={dummyBtn}/>
        <Buttons content={'Menu'} style={dummyBtn} />
      </div>

      
      <div className='flex items-center mr-10'>
        <div className='w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold'>
        
          <span>U</span> 
        </div>
        <Buttons content={'Logout'} style={dummyBtn} onClick={logoutHandle}/>
        <Buttons  content={'Profie'} style={dummyBtn} onClick={handleProfile}/>
        
      </div>
    </div>
  );
}

export default Header;
