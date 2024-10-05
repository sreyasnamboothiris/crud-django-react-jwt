import React, { useRef, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { submitBtn } from '../Button/buttons';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../Redux/userSlice';
import toast, { Toaster } from 'react-hot-toast';

function ProfilePage() {
  const dispatch = useDispatch();
  const { control, handleSubmit, watch, formState: { errors } } = useForm();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.auth.isAuth);
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(user?user.profile_picture:null);
  const navigate = useNavigate();
  const watchProfilePicture = watch('profile_picture'); 

  useEffect(() => {
    if (token === null) {
      navigate('/');
    } else {
      console.log(token, 'this is profile page');
    }
  }, [token]);

 
  useEffect(() => {
    if (watchProfilePicture && watchProfilePicture.length > 0) {
      const file = watchProfilePicture[0];
      setImageUrl(URL.createObjectURL(file));
    }
  }, [watchProfilePicture]);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const formHandle = async (data) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);

    if (data.profile_picture && data.profile_picture.length > 0) {
      formData.append('profile_picture', data.profile_picture[0]);
    }
       api.put(`/users/profile/update/${user.id}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response)=>{
        if(response.status === 400){
          if(response.response.data.username){
            toast.error(response.response.data.username[0]);
          } else if(response.response.data.email){
            toast.error(response.response.data.email[0]);
          } else{
            toast.error('Error updating profile')
          }
        } else{
          dispatch(setUser(response.data))
          localStorage.setItem('user',JSON.stringify(response.data))
          toast.success('Successfull edited user')
        setTimeout(() => {
          navigate('/home', { replace: true });
        }, 2000)
        }
      }).catch((error)=>{

        toast.error('Ther is som error happen')
      })
      

     
      
    }

  return (
    <div className="flex items-center bg-[#3C0B63] text-white flex-col p-4">
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <div className="border-2 p-2 px-4 font-bold text-2xl m-3 rounded border-black">
        <h1>Profile Page</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(formHandle)}>
          <div className="flex items-center justify-center flex-col p-3">
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
                rules={{
                  validate: {
                    
                    isImage: (value) => {
                      const file = value && value[0];
                      if(file){if (!file.type.startsWith('image/')) return "Only image files are allowed.";
                        return true
                      }
                      ;
                    },
                  },
                }}
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
              <div>{errors.profile_picture && (
                  <span className='text-red-500 text-sm absolute'>
                    {errors.profile_picture.message}
                  </span>
                )}</div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col p-2 m-1">
                <label htmlFor="username">Edit User Name</label>
                <Controller
                  name="username"
                  control={control}
                  defaultValue={user?user.username:''}
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
                <label htmlFor="email">Edit Email</label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={user?user.email:''}
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
              <button type="submit" className={`hover:bg-black mt-3d ${submitBtn}`}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
