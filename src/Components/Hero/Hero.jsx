import React from 'react';
import { PhotoNewsCard } from '../index';

const Hero = ({ newsData }) => {
  if (!Array.isArray(newsData) || newsData.length === 0) {
    return <div>Loading...</div>; // Or a fallback UI while data is loading
  }
  
  return (
    <>
      <div className='md:grid md:grid-cols-3 md:grid-rows-2 md:gap-[2px] md:h-[535px]' style={{ gridTemplateColumns: '2.5fr 1fr 1fr', gridTemplateRows: '1.5fr 1fr' }}>
        {
          newsData.slice(0, 4).map((item, index) => {
            const gridClasses = [
              'md:row-span-2',
              'md:row-span-1 md:col-span-2',
              'md:row-start-2 md:col-start-2',
              'md:row-start-2 md:col-start-3',
            ][index];

            return (
              <PhotoNewsCard
                key={index}
                catagory={item.category}
                title={item.title}
                date={item.date}
                slug={item._id}
                width='100%'
                className={`${gridClasses} h-[240px] md:h-full mb-5 md:mb-0 border-2`}
                categoryRequired
                backgroundImage={item?.images&&item?.images[0]}
                catagoryBackground='#e70940'
              />
            );
          })
        }
      </div>
    </>
  );
}

export default Hero;
