import React, { useState } from 'react'
import { Modal } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
const CustomerInfo = ({ record }) => {
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
        title='Customer Info'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Email: {record.customer_details.email}</p>
        <p>Phone Number: {record.phone_number}</p>
        <p>Address: {record.customer_details.address}</p>
        <p>City: {record.customer_details.city}</p>
        <p>Country: {record.customer_details.country}</p>
        <p>State: {record.customer_details.state}</p>
      </Modal>
    </>
  )
}
export default CustomerInfo
