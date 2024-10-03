import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { font } from '../../utility/font';

const TextNewsCard = ({children, image, content = '', date = '', heading, author = '', className = '', imageHeight, imageWidth, slug, dateClasses}) => {
  const navigate = useNavigate();
  return (
    <div className={`relative ${className} cursor-pointer`} onClick={()=>navigate(`news/${slug}`)} >
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: imageHeight || "300px",
          width: imageWidth || "100%",
          flexShrink: 0,
        }}
        className="flex justify-center items-center"
      >
        <img src={image} alt="News Image" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition:"center" }} loading='lazy'/>
      </div>
      <div>
        <h3 className='font-bold text-2xl mt-3' style={{fontFamily: font.subheading}}>{heading.length > 40 ? heading.slice(0, 40)+"..." : heading}</h3>
        <div className='flex gap-3 items-center text-sm'>
          {
            author && <p className='font-semibold'>{author} &nbsp; |</p>
          }
          <p className={`font-thin ${dateClasses}`}>{date}</p>
        </div>
        {
          content && <p>{content.length > 40 ? content.slice(0, 40)+"..." : content}</p>
        }
      </div>
      {children} {/* News Catagory */}
    </div>
  )
}

export default TextNewsCard
