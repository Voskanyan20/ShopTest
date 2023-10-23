import React from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

export default function PaySuccess () {
  const navigate = useNavigate()
  return (
    <div className='body'>
      <div className='card'>
        <div className='card_div'>
          <i className='checkmark'>✓</i>
        </div>
        <h1 className='card_h1'>Success</h1>
        <p className='card_p'>
          We received your purchase request;
          <br /> we'll be in touch shortly!
        </p>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    </div>
  )
}
