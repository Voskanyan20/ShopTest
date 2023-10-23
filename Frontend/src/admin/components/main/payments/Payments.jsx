import { Table } from 'antd'
import { useEffect, useState } from 'react'
import SearchFunc from '../../search'
import { getUsePayments } from '../../../../utils/Route'
import { showDeleteConfirm } from '../../delete'
import { DeleteOutlined } from '@ant-design/icons'
import CustomerInfo from './CustomerInfo'
import ProductInfo from './ProductInfo'

const Payments = () => {
  const [render] = useState(false)
  const [paymentsData, setPaymentsData] = useState(null)
  let lastIndex = 0
  const updateIndex = () => {
    lastIndex++
    return lastIndex
  }

  useEffect(() => {
    async function fetchData () {
      await getUsePayments(setPaymentsData)
    }
    fetchData()
  }, [render])

  const [columns] = useState([
    {
      title: 'Customer',
      ...SearchFunc('user_name'),
      render: record => {
        return (
          <div className='payment_table_row_div'>
            <p>{record.user_name}</p>
            <div className='actionsIcons'>
              <CustomerInfo record={record} />
            </div>
          </div>
        )
      }
    },
    {
      title: 'Product',
      render: record => {
        console.log(record)
        return (
          <div className='payment_table_row_div'>
            <p>{record.product_details.productName}</p>
            <div className='actionsIcons'>
              <ProductInfo record={record} />
            </div>
          </div>
        )
      }
    },
    {
      title: 'Currency',
      dataIndex: 'currency'
    },
    {
      title: 'Price',
      render: record => {
        return (
          <div className='payment_table_row_div'>
            <p>{record.product_details.price}$</p>
          </div>
        )
      }
    },
    {
      title: 'Phone',
      dataIndex: 'phone_number'
    },
    {
      title: 'Actions',
      render: record => {
        return (
          <div className='actionsIcons'>
            <DeleteOutlined
              onClick={() => {
                showDeleteConfirm(record, 'deletePayment', 'payment', setPaymentsData)
              }}
              className='deleteIcons'
            />
          </div>
        )
      }
    }
  ])

  return (
    <div className='main'>
      <div className='mainTitle'>
        <span>Payments</span>
      </div>
      <Table
        columns={columns}
        rowKey={updateIndex}
        dataSource={paymentsData}
        scroll={{ y: 445 }}
        loading={paymentsData ? false : true}
        className='tableStyle'
      />
    </div>
  )
}
export default Payments
