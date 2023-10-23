import { Button } from 'antd'
import React from 'react'
import { getCookie } from '../../../login/LoginAcces'
import { ShopTwoTone } from '@ant-design/icons'
import { removeFromLocalStorage } from '../../../utils/Route'

export default function Header ({ handleSignOut, handleSignIn }) {
  const token = getCookie('token')
  if (!token) {
    removeFromLocalStorage('userId')
  }

  return (
    <div className='shop_header'>
      <ShopTwoTone />
      <Button onClick={token ? handleSignOut : handleSignIn}>
        {token ? 'Sign out' : 'Sign In'}
      </Button>
    </div>
  )
}
