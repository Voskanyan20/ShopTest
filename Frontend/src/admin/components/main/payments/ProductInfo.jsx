import React, { useState } from 'react'
import { Modal } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
const ProductInfo = ({ record }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
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
      <MoreOutlined onClick={showModal} />
      <Modal
        title='Product Info'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <img style={{ width: '50%' }} src={record.product_details.image} alt='img' />
        <h3>Name: {record.product_details.productName}</h3>
        <h4>Price: ${record.product_details.price}</h4>
        <h4>Quantity: {record.product_details.quantity}</h4>
      </Modal>
    </>
  )
}
export default ProductInfo
