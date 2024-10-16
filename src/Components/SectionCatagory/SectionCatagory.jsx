import React from 'react'
import { font } from '../../utility/font'

const SectionCatagory = ({ children, name = 'Lorem', color = 'white', backgroundColor = 'black', className=''}) => {
  return (
    <div className={`border-red-400 flex justify-between relative mb-7 ${className}`}>
      <div className='flex flex-col h-11'>
        <div className=' flex w-fit flex-col items-center'>
          <h2 className='w-fit py-1 px-4 font-bold rounded-tl-lg text-xl' style={{ backgroundColor, color, fontFamily: font.heading }}>{name.toUpperCase()}</h2>
          <span className='block w-0 h-0 border-[10px] border-transparent' style={{ color, borderTop: `solid 10px ${backgroundColor}` }}></span>
        </div>
      </div>
      <div className='h-8'>
      {children}
      </div>
      <div className='border w-full absolute top-8' style={{ borderColor: backgroundColor }}></div>
    </div>
  )
}

export default SectionCatagory
