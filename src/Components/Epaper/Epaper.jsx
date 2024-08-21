import React from 'react'
import {SectionCatagory} from '../index'
import { Button } from '@mui/material'

const Epaper = () => {
  return (
    <div>
      <SectionCatagory name='ई-पेपर' backgroundColor='green'/>
      <ul className='flex gap-4'>
        <Button size='large' sx={{ fontWeight: 'bold', fontSize: '1.2rem' }} variant='contained' color='secondary'>अवध केसरी हिंदी दैनिक</Button>
        <Button size='large' sx={{ fontWeight: 'bold', fontSize: '1.2rem' }} variant='contained' color='primary'>अवध केसरी हिंदी साप्ताहिक</Button>
      </ul>
    </div>
  )
}

export default Epaper
