import React, { useContext, useEffect, useState } from 'react'
import EmailForm from '../FormComponents/EmailForm'
import { useForm, Controller } from 'react-hook-form'
import PasswordForm from '../FormComponents/PasswordForm';
import Button from '../Button/Button';
import { submitBtn, toggleBtn } from '../Button/buttons';
import { LoginStateContext } from '../../context/LoginStateProveder';
import UserNameForm from '../FormComponents/UserNameForm';
import ImageForm from '../FormComponents/ImageForm';
import { useNavigate } from 'react-router-dom';

function Form() {

  const [admin,setAdmin] = useState(false);
  const [signup,setSignup] = useState(false);
  const navigate = useNavigate();
  const {isSignup,isAdmin,setIsAdmin,setIsSignup} = useContext(LoginStateContext);
  const signinToggle = ()=>{
    setSignup(!signup)
    setIsSignup(!isSignup);
  }
  const { control, handleSubmit, formState:{errors}} = useForm();

  const onSubmit = (data)=>{
    console.log(data,'onSubmit called, working prperly');
    navigate('/home')
    
  }
  const handleError = (errors,e)=>{
    console.log(errors)
  }
  return (
    <div className='flex flex-col justify-center items-center p-5 '>
      <form onSubmit={handleSubmit(onSubmit,handleError)} action="">
        <div className='p-4 flex flex-col gap-6'>
            {isSignup&&isAdmin==false&&
            <UserNameForm control={control} error={errors}/>}
            <EmailForm control={control} error={errors}/>
            <PasswordForm control={control} error={errors}/>
            
            <Button content={isSignup?'Sign up':'Login'} style={submitBtn} type='submit'/>
            
        </div>
        
      </form>
      <div className='p-4'>
        {isAdmin===false && <Button content={isSignup?'Login':'Sign up'} style={toggleBtn} onClick={signinToggle} />}
        </div>
            <div>{isSignup===false&&<Button content={isAdmin?'User':'Admin'} style={toggleBtn} onClick={()=>{setIsAdmin(!isAdmin)}} />}
              
            </div>
          
        
    </div>
  )
}

export default Form
