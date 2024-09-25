import React from 'react'
import { Controller } from 'react-hook-form';

function InputField({ control, name, type, placeholder, rules }) {
  console.log('here rendered',control,name, type, placeholder, rules)
  return (
    <div className='flex flex-col'>
    <div className='flex flex-col'>
    <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <input
            {...field}
            className='text-white text-left rounded-[12px] bg-[#814EC3] focus:outline-non outline-none'
            type={type}
            placeholder={placeholder}
          />
        )}
      />
      
    </div>
    
      

      </div>
    )
  }

export default InputField;
