import React from 'react'
import {FeaturedNewsSection, SectionCatagory} from '../index'

const Health = ({newsData}) => {
  return (
    <>
      <SectionCatagory name='health' backgroundColor='#9202d2'/>
      <FeaturedNewsSection newsData={newsData.slice(0,4)}/>
    </>
  )
}

export default Health
