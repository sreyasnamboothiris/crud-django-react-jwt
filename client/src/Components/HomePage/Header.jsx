import React from 'react';
import Buttons from '../Button/Button';
import { dummyBtn } from '../Button/buttons';

function Header() {
  return (
    <div className='flex items-center justify-between p-4 bg-gray-800 text-white'>
      {/* Left Side Buttons */}
      <div className='flex space-x-4'>
      <Buttons content={'Home'} style={dummyBtn}/>
        <Buttons content={'About'} style={dummyBtn}/>
        <Buttons content={'Menu'} style={dummyBtn}/>
      </div>

      {/* Profile Section */}
      <div className='flex items-center mr-10'>
        <div className='w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold'>
          {/* Placeholder for User Image */}
          <span>U</span> {/* You can replace this with an image tag */}
        </div>
        <Buttons content={'Profie'} style={dummyBtn}/>
        
      </div>
    </div>
  );
}

export default Header;
