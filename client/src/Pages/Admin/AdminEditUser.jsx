import React, { useEffect, useRef, useState } from 'react'
import AdminHeader from '../../Components/AdminComponents/AdminHeader'
import AdminNavbar from '../../Components/AdminComponents/AdminNavbar'
import { useForm } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { submitBtn } from '../../Components/Button/buttons'
import api from '../../api'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
import { setEditUser } from '../../Redux/editUser'


function AdminEditUser() {
  const {control, handleSubmit, formState: { errors },watch } = useForm()
  const user = useSelector((state)=>state.user.user);
  const token = useSelector((state)=>state.auth.isAuth)
  const navigate = useNavigate();
  const editUser = useSelector((state)=>state.editUser.editUser)
  const [imageUrl,setImageUrl] = useState(editUser?editUser.profile_picture:null);
  const fileInputRef = useRef();
  const watchProfilePicture = watch('profile_picture')
  const dispatch = useDispatch();
  const handleEditClick = ()=>{
    console.log('edit')
    fileInputRef.current.click();
  }
  useEffect(() => {
    if (watchProfilePicture && watchProfilePicture.length > 0) {
      const file = watchProfilePicture[0];
      setImageUrl(URL.createObjectURL(file));
    }
  }, [watchProfilePicture]);
 
  useEffect(()=>{
    if(!user||!user.is_superuser||!token){
      navigate('/')
    }
  },[])
  
  const formHandle = (data)=>{
    console.log(data)
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);

    if (data.profile_picture && data.profile_picture.length > 0) {
      formData.append('profile_picture', data.profile_picture[0]);
    }


       api.put(`/users/profile/update/${editUser.id}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response)=>{
        console.log(response.data);
        dispatch(setEditUser(response.data))
      }).catch((error)=>{
        console.log(error);
      })
    
    api.post('/admin/users/',data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response=>{
      toast.success('Successfully updated user')

      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    }).catch(errors=>{
      toast.error('Failed to create')
      console.log(errors,toast)
    })
  }
  return (
    <div>
      <AdminHeader/>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <div className='flex flex-row p-2 gap-2'>

      <AdminNavbar/>
      <div className='flex flex-col justify-center items-center  gap-4 w-full'>
      
        <div className='m-4 mt-'><h1 className='text-3xl font-bold'>Create User</h1></div>
          <div>
          <form onSubmit={handleSubmit(formHandle)}>
          <div className="flex items-center flex-col p-3">
          <div className="relative w-32 bg-black h-32 rounded overflow-hidden">
              <img
                src={imageUrl ? imageUrl:''}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <span onClick={handleEditClick} className="absolute bottom-2 right-2 cursor-pointer text-white">
                <i className="fa-solid fa-pen-to-square"></i>
              </span>
            </div>
            <div>
              <Controller
                name="profile_picture"
                control={control}
                render={({ field: { onChange, ref } }) => (
                  <input
                    type="file"
                    ref={(e) => {
                      ref(e);
                      fileInputRef.current = e;
                    }}
                    className="hidden"
                    onChange={(e) => {
                      onChange(e.target.files);
                    }}
                  />
                )}
              />
            </div>
            
            <div className="flex flex-col">
              <div className="flex flex-col p-2 m-1">
                <label htmlFor="username">Enter User Name</label>
                <Controller
                  name="username"
                  control={control}
                  defaultValue={editUser?editUser.username:''}
                  rules={{
                    required: "Username is required",
                    minLength: {
                      value: 4,
                      message: 'username must be at least 4 characters long'
                    }
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="bg-[#A388EF] rounded"
                    />
                  )}
                />
                <div>{errors.username && (
                  <span className='text-red-500 text-sm absolute'>
                    {errors.username.message}
                  </span>
                )}</div>
              </div>
              <div className="flex flex-col p-2 m-1">
                <label htmlFor="email">Enter Email</label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={editUser?editUser.email:''}
                  rules={{
                    required: 'Email is required', 
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                      message: 'Invalid email format' 
                    },
                    maxLength: {
                      value: 50,
                      message: 'Email cannot exceed 50 characters'
                    },
                    validate: value => value.includes('@') || 'Email must contain @', 
                  }}
                  render={({ field }) => (
                    <input
                      type="email"
                      {...field}
                      className="bg-[#A388EF] rounded"
                    />
                  )}
                />
                <div>{errors.email && (
                  <span className='text-red-500 text-sm absolute'>
                    {errors.email.message}
                  </span>
                )}</div>
              </div>
              
              
              <button type="submit" className={`mt-8 hover:bg-black ${submitBtn}`}>
                Submit
              </button>
            </div>
          </div>
        </form>
          </div>

      </div>
      </div>
      
    </div>
  )
}

export default AdminEditUser
