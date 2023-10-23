import React from 'react'
import { useEffect, useState } from 'react'
import { Avatar, Badge, Button, Modal, Space } from 'antd'
import { cancel } from '../../../utils/Messages'
import { Table } from 'antd'
import {
  BasketProductQuantityChange,
  getBasketProducts
} from '../../../utils/Route'
import { deleteBasketProduct } from '../../../admin/components/delete/index'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import basketIcon from '../../../assets/basket.svg'
import { getCookie } from '../../../login/LoginAcces'
import PaymentButton from '../Pay/PaymentButton'

export default function Basket ({ userId }) {
  const [open, setOpen] = useState(false)
  const [render, setRender] = useState(false)
  const [BasketProductData, setBasketProductData] = useState(null)
  let totalPrice = 0
  let lastIndex = 0
  const updateIndex = () => {
    lastIndex++
    return lastIndex
  }

  useEffect(() => {
    async function fetchData () {
      await getBasketProducts(userId, setBasketProductData)
    }
    fetchData()
  }, [render])

  const calculateTotalPrice = () => {
    BasketProductData &&
      BasketProductData.productResult?.map(product => {
        return product.basketProducts?.map(quantity => {
          return totalPrice += product.price * quantity.quantity
        })
      })
    return totalPrice
  }
  calculateTotalPrice()

  const handleChangeQuantity = async (
    userId,
    productId,
    render,
    setRender,
    method
  ) => {
    BasketProductQuantityChange(userId, productId, render, setRender, method)
  }

  const [columns] = useState([
    {
      title: 'Image',
      render: record => {
        return (
          <div className='actionsIcons'>
            <img className='basket_product_image' src={record.imageUrl} alt='img' />
          </div>
        )
      }
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Quantity',
      render: record => {
        return (
          <div>
            {record.basketProducts?.map(item => {
              return (
                <>
                  {item.quantity === 1 ? (
                    <Button icon={<MinusOutlined />} disabled />
                  ) : (
                    <Button
                      key={`product${updateIndex()}`}
                      onClick={() =>
                        handleChangeQuantity(
                          userId,
                          item.productId,
                          render,
                          setRender,
                          'decline'
                        )
                      }
                      icon={<MinusOutlined />}
                    />
                  )}
                  <span key={`quantity${updateIndex()}`}>
                    {' '}
                    {item.quantity}{' '}
                  </span>
                  <Button
                    key={`product${updateIndex()}`}
                    onClick={() =>
                      handleChangeQuantity(
                        userId,
                        item.productId,
                        render,
                        setRender,
                        'increase'
                      )
                    }
                    icon={<PlusOutlined />}
                  />
                </>
              )
            })}
          </div>
        )
      }
    },
    {
      title: 'Price',
      dataIndex: 'price'
    },
    {
      title: 'Actions',
      render: record => {
        return (
          <div className='actionsIcons'>
            {record.basketProducts?.map(item => {
              return (
                <DeleteOutlined
                  onClick={() => {
                    deleteBasketProduct(
                      item,
                      'deleteBasketProduct',
                      render,
                      setRender
                    )
                  }}
                  className='deleteIcons'
                />
              )
            })}
          </div>
        )
      }
    }
  ])

  return (
    <>
      {getCookie('token') && (
        <Space
          style={{ margin: '10px 0' }}
          size='large'
          onClick={() => {
            setOpen(true)
          }}
        >
          <Badge
            count={BasketProductData && BasketProductData.productResult.length}
          >
            <Avatar shape='square' src={basketIcon} size='large' />
          </Badge>
        </Space>
      )}

      <Modal
        centered
        open={open}
        footer={null}
        onCancel={() => {
          cancel()
          setOpen(false)
        }}
        destroyOnClose
        width={700}
      >
        <div className='basket_main'>
          <div className='mainTitle'>
            <span>Basket</span>
          </div>
          <Table
            columns={columns}
            rowKey={updateIndex}
            dataSource={BasketProductData && BasketProductData.productResult}
            scroll={{ y: 330 }}
            loading={BasketProductData ? false : true}
            className='basket_table'
          />
        </div>
        <div className='basket_buy_Button'>
          <div className='total_price_div'>
            <h2>Total: </h2>
            <h2>${totalPrice}</h2>
          </div>
          <PaymentButton
            data={BasketProductData && BasketProductData.productResult}
            userId={userId}
            totalPrice={totalPrice}
          />
        </div>
      </Modal>
    </>
  )
}
