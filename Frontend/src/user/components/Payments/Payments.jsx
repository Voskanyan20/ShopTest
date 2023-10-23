import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import { getPaymentsById } from '../../../utils/Route'
import { getCookie } from '../../../login/LoginAcces'
const Payments = ({ userId, render, setRender }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userPaymentData, setUserPaymentData] = useState([])
  const user_id = parseInt(userId)
  let totalPrice = 0
  useEffect(() => {
    async function fetchData () {
      await getPaymentsById(user_id, setUserPaymentData)
    }
    fetchData()
  }, [userId , user_id ])

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {getCookie('token') && <Button onClick={showModal}>Payments</Button>}
      <Modal
        title='My Payments'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className='user_payments_div'>
          {userPaymentData.length > 0 ? (
            userPaymentData.map(item => {
              totalPrice +=
                item.product_details.price * item.product_details.quantity
              return (
                <div className='user_payment_item'>
                  <img src={item.product_details.image} alt='img' />
                  <p>${item.product_details.price}</p>
                  <p>{item.customer_details.address}</p>
                  <p>Quantity: {item.product_details.quantity} item</p>
                </div>
              )
            })
          ) : (
            <h1 className='user_payment_notFound'>Not Found</h1>
          )}
        </div>
        {userPaymentData.length > 0 && (
          <div className='user_payment_totalPrice'>
            <h3>Total Price: ${totalPrice}</h3>
          </div>
        )}
      </Modal>
    </>
  )
}
export default Payments
