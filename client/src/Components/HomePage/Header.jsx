import React from 'react';
import Buttons from '../Button/Button';
import { dummyBtn } from '../Button/buttons';
import { useLocation, useNavigate } from 'react-router-dom';


function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const handle = ()=>{
    if (location.pathname!=='/home/profile'){
      navigate('profile');
    }
  }
  return (
    <div className='flex items-center justify-between p-4 bg-gray-800 text-white'>
      {/* Left Side Buttons */}
      <div className='flex space-x-4'>
      <Buttons content={'Home'} style={dummyBtn}/>
        <Buttons content={'About'} style={dummyBtn}/>
        <Buttons content={'Menu'} style={dummyBtn}/>
      </div>

      
      <div className='flex items-center mr-10'>
        <div className='w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold'>
        
          <span>U</span> 
        </div>
        <Buttons content={'Logout'} style={dummyBtn}/>
        <Buttons onClick={handle} content={'Profie'} style={dummyBtn}/>
        
      </div>
    </div>
  );
}

export default Header;
