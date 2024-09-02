import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {NewsCatagory} from '../index';

const PhotoNewsCard = ({catagory, title='', date, slug, width="200px", catagoryBackground, catagoryColor, backgroundImage  , contentPadding = '10px', className='', contentColor='white', categoryRequired}) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`news/${slug}`)} style={{backgroundImage: `url(${backgroundImage})`, width, padding: contentPadding, color: contentColor}} className={`bg-cover bg-center bg-no-repeat ${className} text-white cursor-pointer`}>
      {categoryRequired && <NewsCatagory catagory={catagory} backgroundColor={catagoryBackground} color={catagoryColor} />}
      <h3 className='font-bold'>{title}</h3>
      <p className='font-thin'>{date}</p>
    </div>
  )
}
// '/images/dummyImage.webp'

export default PhotoNewsCard
