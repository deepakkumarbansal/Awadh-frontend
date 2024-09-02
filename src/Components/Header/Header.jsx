import React from 'react'
import { FollowUs, Logo, NavBar } from '../index'

const Header = () => {
  return (
    <>
      <div className='sm:flex gap-6 py-10'>
        <Logo width='1500px'/>
        <div className='w-full bg-green-100 min-h-20'>
          AD
        </div>
      </div>
      <div className='lg:w-1/3 md:w-1/2 lg:ml-[66%] md:ml-[50%] mb-5'>
        <FollowUs/>
      </div>
      <NavBar />
    </>
  )
}

export default Header
