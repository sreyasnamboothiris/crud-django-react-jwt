import React from 'react'
import Heading from './Heading'

function LoginPage() {
  return (
    <div className='flex items-center flex-col justify-center p-5 bg-[#3C0B63]'>
      <Heading/>
      <p className='text-white font-semibold text-xl'>Please login to continue</p>
    </div>
  )
}

export default LoginPage
