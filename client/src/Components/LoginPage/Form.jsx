import React, { useContext, useEffect, useState } from 'react'
import EmailForm from '../FormComponents/EmailForm'
import { useForm, Controller } from 'react-hook-form'
import PasswordForm from '../FormComponents/PasswordForm';
import Button from '../Button/Button';
import { adminBtn, submitBtn, toggleBtn } from '../Button/buttons';
import { LoginStateContext } from '../../context/LoginStateProveder';
import UserNameForm from '../FormComponents/UserNameForm';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated,logedOut } from '../../Redux/authSlice';
import axios from 'axios';
import { setUser } from '../../Redux/userSlice';


Modal.setAppElement('#root');
function Form() {

  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('')
  const [modalType, setModalType] = useState(''); 
  const [signup,setSignup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state)=>{
    return state.auth.isAuth
  })
  

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
        
        setModalMessage('Signup successful!');
        setModalType('success');
        setModalIsOpen(true);
        setIsSignup(false)
       
      })
      .catch(error=>{
        setModalMessage(error.response.data.username || error.response.email,'Please try again.'); // Error message
      setModalType('error');
      setModalIsOpen(true);
        
      })
    } else if (!isAdmin){
      
      api.post('token/',data,{headers: {
        'Content-Type': 'application/json'
      }})
      .then(response=>{
        const token = response.data.access;
        const refres = response.data.refresh;
        localStorage.clear();
        localStorage.setItem('token', token);
        localStorage.setItem('refresh',refres);
        
        dispatch(isAuthenticated(token));
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`
        
        setModalMessage('Login successful!');
        setModalType('success');
        setModalIsOpen(true);
        
        
      }).catch(error=>{
        console.log(error)
        setModalMessage((error.response.data.username || error.response.data.email || 'An error occurred') + ', Please try again.');
        setModalType('error');
        setModalIsOpen(true);
      })
    }
    
  }
  const closeModal = () => {
    setModalIsOpen(false);
    if (!isSignup && modalType === 'success'){
      api.get('/users/home/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res=>{
        console.log(res.data)
        localStorage.setItem('user', JSON.stringify(res.data));
        dispatch(setUser(res.data))

        if (res.data.is_superuser){
            navigate('/admin')
        } else{
          navigate('/home')
        }
        
      }).catch(errors=>{
        console.log(errors)
      })
      
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
            
            {isSignup&&isAdmin==false&&
            <UserNameForm control={control} error={errors}/>}
            <EmailForm control={control} error={errors}/>
            <PasswordForm control={control} error={errors}/>
            {!isSignup && 
            <div className='flex justify-between'>
            <div className='flex items-center me-4'>
              <input type="checkbox" className='rounded-[12px]' />
              <label htmlFor="" className='ms-2 text-sm text-white '>Remember me</label>
            </div>
            <div>
              <a href="" className='text-black text-sm'>Forgot password</a>
            </div>
            </div>
            }
            
            
            <Button content={isSignup?'Sign up':'Login'} style={submitBtn} type='submit'/>
            
        </div>
        
      </form>
      <div className='flex items-center'>
              <hr className='w-32 h-px mx-auto my-4 bg-white border-0 rounded dark:bg-white'/>
              <p className='px-2 text-white'>Or</p>
              <hr className='w-32 h-px mx-auto my-4 bg-white border-0 rounded dark:white'/>
      </div>
      <div className='p-4'>
        {isAdmin===false && <Button content={isSignup?'Login':'Sign up'} style={toggleBtn} onClick={signinToggle} />}
        </div>
            <div>{isSignup===false&&<Button content={isAdmin?'User':'Admin'} style={adminBtn} onClick={()=>{setIsAdmin(!isAdmin)}} />}
              
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
