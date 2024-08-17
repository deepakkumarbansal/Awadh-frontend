import React, { useState } from 'react'
import {NewsCatagory, SectionCatagory, TextNewsCard} from '../index'

const Technology = ({newsData}) => {
    const [data, setData] = useState(newsData.slice(0, 6));
    const firstData = data[0];
    const remainingData = data.slice(1);

  return (
    <>
      <SectionCatagory name='Technology' backgroundColor='#2596be'/>
      <TextNewsCard heading={firstData.title} content={firstData.content} image={firstData.image} imageWidth={'100%'} imageHeight={'230px'} date={firstData.date} author={firstData.author}>
        <NewsCatagory catagory={firstData.category} backgroundColor={'#2596be'} className='absolute top-5 left-5'/>
      </TextNewsCard>
      {
        remainingData.map((item, index)=>(
            <TextNewsCard key={index} className = 'flex gap-4 mt-7' image={item.image} heading={item.title} date={item.date} imageHeight={'90px'} imageWidth={'110px'}/>
        ))
      }
    </>
  )
}

export default Technology
