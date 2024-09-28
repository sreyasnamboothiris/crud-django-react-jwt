import React from 'react'
import AdminHeader from '../../Components/AdminComponents/AdminHeader'
import AdminNavbar from '../../Components/AdminComponents/AdminNavbar'
import AdminHome from '../../Components/AdminComponents/AdminHome'

function Admin() {
  return (
    <div>
      <AdminHeader/>
      <div className='flex flex-row p-2 gap-2'>

      <AdminNavbar/>
      <AdminHome/>
      </div>
      
    </div>
  )
}

export default Admin
