import React from 'react'
import '../styles/notFound.css'
import { useNavigate } from 'react-router-dom'

export default function NotFound () {
  const navigate = useNavigate()
  return (
    <div id='notfound'>
      <div class='notfound'>
        <div class='notfound-404'>
          <h1>404</h1>
          <h2>Page not found</h2>
        </div>
        <button onClick={() => navigate('/')}>Homepage</button>
      </div>
    </div>
  )
}
