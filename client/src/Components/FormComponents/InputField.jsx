import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function InputField() {

  return (
    <div className='flex rounded-[12px] flex-row bg-[#814EC3] items-center justify-center'>
      <FontAwesomeIcon icon="fa-solid fa-user" className='p-2 ml-2 mr-2'/>
      <input className='text-white text-left rounded-[12px] bg-[#814EC3]' type="text" placeholder='Enter your email' />
    </div>
  )
}

export default InputField
