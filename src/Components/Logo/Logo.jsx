import React from 'react'

const Logo = ({className, image}) => {
  return (
    <div className={className}>
      {image ? <img src={image} alt="Awadh Kesari" /> : <img src="/images/logo.png" alt="Awadh Kesari" />}
    </div>
  )
}

export default Logo
