import React, { useRef, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { submitBtn } from '../Button/buttons';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../Redux/userSlice';

function ProfilePage() {
  const dispatch = useDispatch();
  const { control, handleSubmit, watch } = useForm();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.auth.isAuth);
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(user?`http://localhost:8000${user.profile_picture}`:null);
  const navigate = useNavigate();
  const watchProfilePicture = watch('profile_picture'); // Watching the file input changes

  useEffect(() => {
    if (token === null) {
      navigate('/');
    } else {
      console.log(token, 'this is profile page');
    }
  }, [token, navigate]);

 
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
        console.log(response.data);
        dispatch(setUser(response.data))
      }).catch((error)=>{
        console.log(error);
      })
      

     
      
    }

  return (
    <div className="flex items-center bg-[#3C0B63] text-white flex-col p-4">
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
                <label htmlFor="username">Edit User Name</label>
                <Controller
                  name="username"
                  control={control}
                  defaultValue={user?user.username:''}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="bg-[#A388EF] rounded"
                    />
                  )}
                />
              </div>
              <div className="flex flex-col p-2 m-1">
                <label htmlFor="email">Edit Email</label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={user?user.email:''}
                  render={({ field }) => (
                    <input
                      type="email"
                      {...field}
                      className="bg-[#A388EF] rounded"
                    />
                  )}
                />
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
