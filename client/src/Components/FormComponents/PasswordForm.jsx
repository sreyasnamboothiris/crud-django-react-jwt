import React from 'react'
import InputField from './InputField'

function PasswordForm(props) {
  return (
    <div className='flex flex-col'>
        <div className='flex rounded-[12px] flex-row bg-[#814EC3] items-center justify-center'>
        <i class="fa-solid fa-lock p-2 ml-2 mr-2"></i>
      <InputField
        control={props.control} // Pass down control from props
        name="password" // Specify the name for the input field
        type="password" // Specify the input type
        placeholder="Enter your password" // Placeholder text
        rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long'
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: 'Password must contain at least one letter and one number'
            }
          }}
         

      />
        
        
        
      
    </div>
    <div>
    {props.error.password && (
        <span className='text-red-500 text-sm absolute'>
          {props.error.password.message}
        </span>
      )}
    </div>
    </div>
    
  )
}

export default PasswordForm
