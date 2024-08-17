import React, { useState } from 'react'
import {FeaturedNewsSection, SectionCatagory} from '../index'

const PopularNews = ({newsData}) => {
  return (
    <>
      <SectionCatagory name='POPULAR NEWS'/>
      <FeaturedNewsSection newsData={newsData.slice(0,5)} categoryRequired catagoryBackground={'black'}/>
    </>
  )
}

export default PopularNews
