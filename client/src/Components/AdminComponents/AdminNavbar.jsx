import React from 'react'

function AdminNavbar() {
  return (
    <div className='bg-gray-700 rounded-[8px] basis-1/6 h-[350px] flex p-2 '>
    <div className='flex flex-col gap-4 w-full p-2'>
      <div className='w-full bg-gray-800 text-white py-2 border-2
       rounded-[8px] border-sky-500 text-center cursor-pointer hover:bg-black hover:-translate-y-1 hover:scale-110 duration-500 hover:shadow-md hover:shadow-black'>
        <h1>Dashboard</h1>
      </div>
      <div className='w-full bg-gray-800 text-white px-4 py-2 border-2 
      rounded-[8px] border-sky-500 text-center cursor-pointer hover:bg-black hover:-translate-y-1 hover:scale-110 duration-500 hover:shadow-md hover:shadow-black'>
        <h1>Users</h1>
      </div>
    </div>
  </div>
  

  )
}

export default AdminNavbar
