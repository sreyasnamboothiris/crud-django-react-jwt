import React from 'react'
import Header from '../../Components/HomePage/Header'
import HomePage from '../../Components/HomePage/HomePage.jsx'
import Test from '../../sample/test.jsx'

function Home() {
  return (
    <div className='h-screen w-screen bg-[#814EC3]]'>
      <Test/>
      <Header/>
      <HomePage/>
    </div>
  )
}

export default Home
