import React from 'react'
import { font } from '../../utility/font'

const NewsCatagory = ({ catagory = 'Health', backgroundColor = 'red', color = 'white', className='', marginLeft}) => {
    return (
        <div className={className} style={{marginLeft}}>
            <h3 style={{ backgroundColor, color, fontFamily: font.heading}} className='w-fit py-1 px-4 text-base font-bold'>{catagory[0].toUpperCase() + catagory.substring(1)}</h3>
            <div className='w-0 h-0 border-b-transparent border-r-transparent border-[5px] mt-[-3px]' style={{ borderTop: `5px solid ${backgroundColor}`, borderLeft: `5px solid ${backgroundColor}` }}></div>
        </div>
    )
}

export default NewsCatagory
