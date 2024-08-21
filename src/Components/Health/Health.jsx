import React from 'react'
import {FeaturedNewsSection, PhotoNewsCard, SectionCatagory} from '../index'

const Health = ({newsData}) => {
  return (
    <>
      <SectionCatagory name='health' backgroundColor='#9202d2'/>
      {/* <FeaturedNewsSection newsData={newsData.slice(0,4)}/> */}
      <div className='flex flex-col gap-5'>
        {
          newsData.slice(0, 3).map((item, index) => (
            <PhotoNewsCard key={index} catagory={item.category} contentPadding={'20px'} title={item.title} date={item.date} slug={item.slug} width={'100%'} catagoryBackground={'#9202d2'} catagoryColor={'white'} backgroundImage={item.image} categoryRequired={true} className='h-[200px]' />
          ))
        }
      </div>
    </>
  )
}

export default Health
