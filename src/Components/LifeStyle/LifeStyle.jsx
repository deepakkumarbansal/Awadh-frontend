import React, { useState } from 'react'
import { FeaturedNewsSection, NewsCatagory, PhotoNewsCard, SectionCatagory, TextNewsCard } from '../index'

const LifeStyle = ({ newsData }) => {
    // const leftPart = newsData.slice(0,5)
    // const rightPart = newsData.slice(5,10)

    return (
        <>
            <SectionCatagory name='LifeStyle' backgroundColor='#fe7806'/>
            {/* <div className='md:flex md:justify-between md:gap-4'>
                <FeaturedNewsSection newsData={leftPart} catagoryBackground={'#fe7806'} categoryRequired/>
                <FeaturedNewsSection newsData={rightPart} catagoryBackground={'#fe7806'} categoryRequired className='mt-7 md:mt-0'/>
            </div> */}
            <div className='flex flex-col gap-5'>
                {
                    newsData.slice(0,3).map((item, index)=>(
                        <PhotoNewsCard key={index} catagory={item.category} contentPadding={'20px'} title={item.title} date={item.date} slug={item.slug} width={'100%'} catagoryBackground={'#fe7806'} catagoryColor={'white'} backgroundImage={item.image} categoryRequired={true} className='h-[200px]'/>
                    ))
                }
            </div>
        </>
    )
}

export default LifeStyle
