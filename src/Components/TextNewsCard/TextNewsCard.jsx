import React from 'react'
import { Link } from 'react-router-dom'

const TextNewsCard = ({children, image, content = '', date = '', heading, author = '', className = '', imageHeight, imageWidth, slug, dateClasses}) => {
  return (
    <div className={`relative ${className}`}>
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: imageHeight,
          width: imageWidth,
          flexShrink: 0,
        }}
        className="flex justify-center items-center"
      >
        <img src={image} alt={heading} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div>
        <h3 className='font-bold text-base'><Link to={slug}>{heading}</Link></h3>
        <div className='flex gap-3 items-center text-sm'>
          {
            author && <p className='font-semibold'>{author} &nbsp; |</p>
          }
          <p className={`font-thin ${dateClasses}`}>{date}</p>
        </div>
        {
          content && <p>{content}</p>
        }
      </div>
      {children} {/* News Catagory */}
    </div>
  )
}

export default TextNewsCard
