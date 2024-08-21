import React from 'react'

const Section = ({children, id, className=''}) => {
  return (
    <div className={`${className} mt-[45px]`} id={id}>
      {children}
    </div>
  )
}

export default Section
