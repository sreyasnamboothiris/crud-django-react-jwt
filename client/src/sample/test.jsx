import React, { useEffect, useState } from 'react'
import api from '../api';

function Test() {
    const [users,setUsers] = useState([]);
    useEffect(()=>{
        const fetchUsers = async ()=>{
            const response = await api.get('/admin/users/');
            setUsers(response.data)
        }
        fetchUsers();
        
    },[])
    console.log(users)
  return (
    <div>
      <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <>
          <li key={user.id}>{user.username}</li>
          <li>{user.email}</li>
          <li>{user.password}</li>
          </> 
        ))}
      </ul>
    </div>
    </div>
  )
}

export default Test
