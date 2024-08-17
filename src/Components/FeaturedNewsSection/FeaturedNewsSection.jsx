import React from 'react'
import {NewsCatagory, PhotoNewsCard, Section, TextNewsCard} from '../index';

const FeaturedNewsSection = ({newsData, categoryRequired, catagoryBackground, photoNewsCardContentPadding}) => {
    const firstData = newsData[0];
    const remainingData = newsData.slice(1);
  return (
    <div>
      <PhotoNewsCard catagory={firstData.category} contentPadding={photoNewsCardContentPadding} title={firstData.title} date={firstData.date} slug={firstData.slug} height='200px' width={'100%'} catagoryBackground={catagoryBackground} catagoryColor={'white'} backgroundImage={firstData.image} categoryRequired={categoryRequired}/>
      {
        remainingData.map((item, index)=>(
            <TextNewsCard key={index} image={item.image} date = {item.date} heading={item.title} className = 'flex gap-4 mt-7' imageHeight='90px' imageWidth='110px' slug={item.slug} dateClasses='text-gray-500'>
                {categoryRequired && <NewsCatagory catagory={item.category} backgroundColor={catagoryBackground} className='absolute text-xs'/>}
            </TextNewsCard>  
        ))
      }
    </div>
  )
}

export default FeaturedNewsSection
