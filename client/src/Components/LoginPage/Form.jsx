import React, { useContext, useEffect, useState } from 'react'
import EmailForm from '../FormComponents/EmailForm'
import { useForm, Controller } from 'react-hook-form'
import PasswordForm from '../FormComponents/PasswordForm';
import Button from '../Button/Button';
import { submitBtn, toggleBtn } from '../Button/buttons';
import { LoginStateContext } from '../../context/LoginStateProveder';
import UserNameForm from '../FormComponents/UserNameForm';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { setToken } from '../../Redux/authSlice';

Modal.setAppElement('#root');
function Form() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('')
  const [modalType, setModalType] = useState(''); 
  const [signup,setSignup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const {isSignup,isAdmin,setIsAdmin,setIsSignup} = useContext(LoginStateContext);
  const signinToggle = ()=>{
    setSignup(!signup)
    setIsSignup(!isSignup);
  }
  const { control, handleSubmit, formState:{errors}} = useForm();

  const onSubmit = (data)=>{
    
    if (isSignup){
      api.post('users/signup/',data)
      .then(response=>{
        console.log(response.data,'signup successful');
        setModalMessage('Signup successful!');
        setModalType('success');
        setModalIsOpen(true);
        setIsSignup(false)
       
      })
      .catch(error=>{
        console.log(error.response.data,'signup failed');
        setModalMessage(error.response.data.username || error.response.email,'Please try again.'); // Error message
      setModalType('error');
      setModalIsOpen(true);
      
        
      })
    } else if (!isAdmin){
      console.log(data)
      api.post('token/',data,{headers: {
        'Content-Type': 'application/json'
      }})
      .then(response=>{
        const token = response.data.access;
        const refres = response.data.refresh;
        console.log(token,'\n refresh: ',refres);
        localStorage.setItem('token', token);
        dispatch(setToken(token));
        setModalMessage('Login successful!');
        setModalType('success');
        setModalIsOpen(true);
      })
    }
    console.log(data,'onSubmit called, working prperly');
    
    
  }
  const closeModal = () => {
    setModalIsOpen(false);
    if (!isSignup && modalType === 'success'){
      navigate('/home');
    } else{
      navigate('/')
    }
    
  };
  const handleError = (errors,e)=>{
    console.log(errors)
  }
  return (
    <div className='flex flex-col justify-center items-center p-5 '>
      <form onSubmit={handleSubmit(onSubmit,handleError)} action="">
        <div className='p-4 flex flex-col gap-6'>
            
            <UserNameForm control={control} error={errors}/>
            {isSignup&&isAdmin==false&&
            <EmailForm control={control} error={errors}/>}
            <PasswordForm control={control} error={errors}/>
            
            <Button content={isSignup?'Sign up':'Login'} style={submitBtn} type='submit'/>
            
        </div>
        
      </form>
      <div className='p-4'>
        {isAdmin===false && <Button content={isSignup?'Login':'Sign up'} style={toggleBtn} onClick={signinToggle} />}
        </div>
            <div>{isSignup===false&&<Button content={isAdmin?'User':'Admin'} style={toggleBtn} onClick={()=>{setIsAdmin(!isAdmin)}} />}
              
            </div>
            <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-70%, -70%)',
          },
        }}
      >
        <h2>{modalType === 'success' ? 'Success!' : 'Error!'}</h2>
        <p>{modalMessage}</p>
        <button className={toggleBtn} onClick={closeModal}>Close</button>
      </Modal>
        
    </div>
  )
}

export default Form
