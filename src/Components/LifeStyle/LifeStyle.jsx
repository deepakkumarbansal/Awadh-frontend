import React, { useState } from 'react'
import { FeaturedNewsSection, NewsCatagory, PhotoNewsCard, SectionCatagory, TextNewsCard } from '../index'

const LifeStyle = ({ newsData }) => {
    const leftPart = newsData.slice(0,5)
    const rightPart = newsData.slice(5,10)

    return (
        <>
            <SectionCatagory name='LifeStyle' backgroundColor='#fe7806'/>
            <div className='md:flex md:justify-between md:gap-4'>
                <FeaturedNewsSection newsData={leftPart} catagoryBackground={'#fe7806'} categoryRequired/>
                <FeaturedNewsSection newsData={rightPart} catagoryBackground={'#fe7806'} categoryRequired className='mt-7 md:mt-0'/>
            </div>
        </>
    )
}

export default LifeStyle
