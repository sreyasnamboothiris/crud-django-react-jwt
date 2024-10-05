import React, { useEffect, useState } from 'react';
import api from '../../api';
import default_image from '../../assets/default_user.jpg'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEditUser } from '../../Redux/editUser';

function AdminHome() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(4); 
  const [search,setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    api.get('admin/users/',{headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },})
      .then(response => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  useEffect(()=>{
    if (search === ''){
      setSearchResults(users);
    } else{
    const filteredUsers = users.filter(user => user.username.toLowerCase().startsWith(search));
    console.log(filteredUsers)
    setSearchResults(filteredUsers)
    }
  },[search,users])

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = searchResults.slice(indexOfFirstUser, indexOfLastUser);
  const editUser = useSelector(state => state.editUser.editUser);
  const dispatch = useDispatch();

  const editHandle = (userId)=>{
    api.get(`/admin/users/detail/${userId}/`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response=>{
      console.log(response.data)
      dispatch(setEditUser(response.data))
      navigate('/admin/edituser')

    }).catch(errors=>{
      console.log(errors)
    })
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='w-full p-3 bg-[#b3b3b3] rounded-[8px] flex flex-col items-f'>
      <div className='w-full bg- flex justify-around'>
        <div className='flex basis-1/4 items-center justify-around'>
          <div className=''>Members</div>
        </div>
        <div className='flex gap-4'>
          <div>{users.length} members</div>
          <div className='border-2 border-black rounded flex'>
            <input onChange={(e)=>{setSearch(e.target.value)}} type="text" name="" id="" className='bg-[#b3b3b3] w-32' />
            <div className='cursor-pointer hover:bg-blue-500' onClick={console.log(search)}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
        <div>
          <button onClick={()=>{navigate('createUser')}} className='px-3 border-2 rounded-[8px] border-gray-800 hover:bg-gray-500 cursor-pointer'>Add member</button>
        </div>
      </div>

      <div className='flex bg-white m-2 flex-col'>
        {currentUsers.map(user => (
          <div key={user.id} className='flex p-1 border-t-2 border-black w-full justify-between bg-gray-300'>
            <div className='flex flex-row gap-4 items-center'>
              <div className='flex justify-center p-2'>
                <input type="checkbox" />
              </div>
              <div className='basis-[50px] bg-white rounded-[50%]'>
                <img className='rounded-[50%] w-10' src={user.profile_picture || default_image} alt="profile" />
              </div>
              <div className='flex flex-row justify-center items-center gap-4'>
                <p className='w-32 truncate'>{user.username}</p>
              </div>
            </div>
            <div className='flex items-center justify-center w-40'>
              <p className='truncate'>{user.email}</p>
            </div>
            <div className='flex items-center justify-center w-32'>
              <p>Joined date</p>
            </div>
            <div className='flex items-center justify-center w-24'>
              <button onClick={()=>{editHandle(user.id)}}>Edit</button>
            </div>
          </div>
        ))}
      </div>

     
      <div className='flex justify-center mt-4'>
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 border ${currentPage === i + 1 ? 'bg-gray-500' : 'bg-white'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;
