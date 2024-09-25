import React from 'react'
import InputField from './InputField'

function EmailForm(props) {
  
  return (
    <div className='flex flex-col'>
      <div className='flex rounded-[12px] flex-row bg-[#814EC3] items-center justify-center'>
      <i class="fa-solid fa-envelope p-2 ml-2 mr-2"></i>
      <InputField
        control={props.control} 
        name="email" 
        type="email"
        placeholder="Enter your email" 
        rules={{ required: 'Email is required'
         }} 
        
      />

    </div>
    <div>
    {props.error.email && (
        <span className='text-red-500 text-sm absolute'>
          {props.error.email.message}
        </span>
      )}
    </div>
    </div>
    
  )
}

export default EmailForm
