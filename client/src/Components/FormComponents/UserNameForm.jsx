import React from 'react'
import InputField from './InputField'

function UserNameForm(props) {
    return (
        <div className='flex flex-col'>
            <div className='flex rounded-[12px] flex-row bg-[#814EC3] items-center justify-center'>
            <i class="fa-solid fa-user p-2 ml-2 mr-2"></i>
          <InputField
            control={props.control} // Pass down control from props
            name="username" // Specify the name for the input field
            type="text" // Specify the input type
            placeholder="Enter your username" // Placeholder text
            rules={{
                required: "Username is required",
                minLength: {
                  value: 4,
                  message: 'username must be at least 4 characters long'
                }
              }}
             
    
          />
            
        </div>
        <div>
        {props.error.username && (
            <span className='text-red-500 text-sm absolute'>
              {props.error.username.message}
            </span>
          )}
        </div>
        </div>
        
      )
}

export default UserNameForm
