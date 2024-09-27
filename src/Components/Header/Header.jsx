import React from 'react'
import { FollowUs, Logo, NavBar, ScrollContainer } from '../index'
import { useNavigate } from 'react-router-dom'

const Header = ({scrollContainerItems}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className='sm:flex gap-6 py-10'>
        <Logo width='1500px' onClick={()=>{navigate('/')}} className={'cursor-pointer'}/>
        <div className='w-full bg-green-100 min-h-20'>
          AD
        </div>
      </div>
      <div className='lg:w-1/3 md:w-1/2 lg:ml-[66%] md:ml-[50%] mb-5'>
        <FollowUs/>
      </div>
      <NavBar />
      <ScrollContainer items={scrollContainerItems}/>
    </>
  )
}

export default Header
