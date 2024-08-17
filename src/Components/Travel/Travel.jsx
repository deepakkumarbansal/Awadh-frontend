import React from 'react'
import {FeaturedNewsSection, SectionCatagory} from '../index'

const Travel = ({newsData}) => {
  return (
    <>
      <SectionCatagory name='travel' backgroundColor='#4257ff'/>
      <FeaturedNewsSection newsData={newsData.slice(0,4)}/>
    </>
  )
}

export default Travel
