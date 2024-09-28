import React from 'react'
import { Link } from 'react-router-dom'
import scrollStyle from './ScrollContainer.module.css'
const ScrollContainer = ({items}) => {
  return (
    <div className='overflow-hidden flex items-center relative'>
        <div className='whitespace-nowrap bg-gray-300 px-6 py-3 relative z-10 text-sm font-bold' >Hindi News Papers</div>
      <ul className={`flex gap-4 text-xl ${scrollStyle['customScroll']}`}>
        {
            items.map((item, index)=>(
              <li key={index} className=''>
                
                {/* here we willmake a object of id and headline, and show the nwes based on the clicked headline by passing slug in the url
                we will  use object id instead of {item.href}
                */}
                    <Link to={`/news/${item.href}`}>{item.text}</Link>
                </li>
            ))
        }
      </ul>
    </div>
  )
}

export default ScrollContainer
