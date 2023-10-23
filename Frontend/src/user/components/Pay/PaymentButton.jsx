import { Button } from 'antd'
import React from 'react'
import { payCheckout } from '../../../utils/Route'

export default function PaymentButton ({ data, userId, totalPrice }) {
  const handleCheckout = async (data, userId, totalPrice) => {
    payCheckout(data, userId, totalPrice)
  }
  return (
    <>
      <Button
        onClick={() => handleCheckout(data, userId, totalPrice)}
        type='primary'
      >
        Payment
      </Button>
    </>
  )
}
