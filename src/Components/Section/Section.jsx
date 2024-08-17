import React from 'react'

const Section = ({children, id}) => {
  return (
    <div className='mt-[45px]' id={id}>
      {children}
    </div>
  )
}

export default Section
