import React, { useEffect, useState } from 'react'
import {
  PostBasketProduct,
  getFromLocalStorage,
  getProducts
} from '../../../utils/Route'
import { Button, Card } from 'antd'
import { getCookie } from '../../../login/LoginAcces'
import Basket from '../Basket/Basket'
import { useNavigate } from 'react-router-dom'
import Payments from '../Payments/Payments'
const gridStyle = {
  width: '25%',
  textAlign: 'center'
}
export default function Products () {
  const navigate = useNavigate()
  let userId = getFromLocalStorage('userId')
  const [render, setRender] = useState(false)
  const [ProductData, setProductData] = useState(null)
  const [token] = useState(getCookie('token'))
  const [totalPrice, setTotalPrice] = useState(0)

  const handleSignIn = () => {
    navigate('/login')
  }

  useEffect(() => {
    async function fetchData () {
      await getProducts(setProductData)
    }
    fetchData()
  }, [render])

  const AddBasketProducts = async (id, productId, render, setRender) => {
    PostBasketProduct(id, productId, render, setRender)
  }

  return (
    <>
      {token && (
        <div className='basketPaymentshow'>
          <Basket
            userId={userId}
            totalPrice={totalPrice}
          />
          <Payments userId={userId} render={render} setRender={setRender} />
        </div>
      )}

      <Card title='Products'>
        {ProductData &&
          ProductData.map(product => {
            return (
              <Card.Grid key={product.id} style={gridStyle}>
                <img
                  className='product_image'
                  src={product.imageUrl}
                  alt='img'
                />
                <hr />
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
                <hr />
                <div className='product_action_div'>
                  <p>${product.price}</p>
                  <Button
                    onClick={() => {
                      getCookie('token')
                        ? AddBasketProducts(
                            userId,
                            product.id,
                            render,
                            setRender
                          ) && setTotalPrice(totalPrice + product.price)
                        : handleSignIn()
                    }}
                  >
                    Add To Card
                  </Button>
                </div>
              </Card.Grid>
            )
          })}
      </Card>
    </>
  )
}
