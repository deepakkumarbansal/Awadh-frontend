import React, { useState } from 'react'
import { FeaturedNewsSection, NewsCatagory, PhotoNewsCard, SectionCatagory, TextNewsCard } from '../index'

const LifeStyle = ({ newsData }) => {
    const leftPart = newsData.slice(0,5)
    const rightPart = newsData.slice(5,10)

    return (
        <>
            <SectionCatagory name='LifeStyle' backgroundColor='#fe7806'/>
            <div className='md:flex md:justify-between'>
                <FeaturedNewsSection newsData={leftPart} catagoryBackground={'#fe7806'} categoryRequired/>
                <FeaturedNewsSection newsData={rightPart} catagoryBackground={'#fe7806'} categoryRequired/>
            </div>
        </>
    )
}

export default LifeStyle
