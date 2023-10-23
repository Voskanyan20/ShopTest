import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { getCookie } from '../login/LoginAcces'

const PrivateRoutes = () => {
  const [token] = useState(getCookie('token'))
  let auth = token ? { token: true } : { token: false }

  return auth.token ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes
