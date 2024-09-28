import React from 'react'

function AdminHome() {
  return (
    <div className='w-full p-3 bg-[#b3b3b3] rounded-[8px] flex flex-col'>
      <div className='w-full bg-yellow-800 flex justify-around'>
        <div className='flex basis-1/4 items-center justify-around'>
          <div className='bg-yellow-500'>Members</div>
        </div>
        <div className='flex gap-4'>
          <div>13 memebers</div>
          <div>Serch bar</div>
        </div>
        <div>Add members</div>
      </div>

      <div className='flex bg-yellow-300 m-2'>
        <div className='w-full  flex p-1 border-t-2 border-black flex-row '>
          <div className='flex flex-row'>
          <div className='basis-1/2 bg-white rounded-[50%]'>
            <img src="" alt="pro" />
          </div>
          <div className='w-full basis-1/3'>
sdjsd
          </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default AdminHome
