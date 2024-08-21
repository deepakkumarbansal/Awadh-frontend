import React from 'react'

const Logo = ({className, image, ...props}) => {
  return (
    <div className={className}>
      <img src={image ? image : "/images/logo.png"} alt="Awadh Kesari" {...props}/>
    </div>
  )
}

export default Logo
