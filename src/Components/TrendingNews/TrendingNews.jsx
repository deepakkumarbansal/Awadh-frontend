import React, { useState } from 'react'
import { PhotoNewsCard, SectionCatagory } from '../index';

const TrendingNews = ({newsData}) => {
    const [data, setData] = useState(newsData.slice(0,4));

  return (
    <>
        <SectionCatagory name='Trending News'/>
      {
        data.map((item, index)=>(
            <PhotoNewsCard key={index} catagory={item.category} title={item.title} slug={item.slug} date={item.date} width={'100%'} height='250px' catagoryBackground={'black'} className='flex flex-col items-center justify-center h-[200px] w-full mt-7'/>
        ))
      }
    </>
  )
}

export default TrendingNews
