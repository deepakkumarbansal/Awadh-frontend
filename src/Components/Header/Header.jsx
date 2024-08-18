import React from 'react'
import { Logo, NavBar } from '../index'

const Header = () => {
  return (
    <>
      <div className='sm:flex gap-6 pt-2 pb-10'>
        <Logo/>
        <div className='w-full bg-green-100 min-h-20'>
          AD
        </div>
      </div>
      <NavBar />
    </>
  )
}

export default Header
