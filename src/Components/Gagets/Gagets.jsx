import React from 'react'
import {FeaturedNewsSection, SectionCatagory} from '../index'

const Gagets = ({newsData}) => {
  return (
    <>
      <SectionCatagory name='gadgets' backgroundColor='#00bcb2'/>
      <FeaturedNewsSection newsData={newsData.slice(0,4)}/>
    </>
  )
}

export default Gagets
