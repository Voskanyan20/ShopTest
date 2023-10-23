import { Table } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import SearchFunc from '../../search'
import { showDeleteConfirm } from '../../delete/index'
import { getProducts } from '../../../../utils/Route'
import AddProduct from './AddProduct'
import UpdateProduct from './UpdateProduct'

const Products = () => {
  const [render, setRender] = useState(false)
  const [ProductData, setProductData] = useState(null)

  useEffect(() => {
    async function fetchData () {
      await getProducts(setProductData)
    }
    fetchData()
  }, [render])

  let lastIndex = 0
  const updateIndex = () => {
    lastIndex++
    return lastIndex
  }
  const [columns] = useState([
    {
      title: 'Name',
      dataIndex: 'name',
      ...SearchFunc('name')
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      ...SearchFunc('price')
    },
    {
      title: 'Image',
      render: record => {
        return (
          <div className='images'>
            <img src={record.imageUrl} alt='img' />
          </div>
        )
      }
    },
    {
      title: 'Actions',
      render: record => {
        return (
          <div className='actionsIcons'>
            <UpdateProduct name={record.name} description={record.description} price={record.price} image={record.imageUrl} render={render} setRender={setRender} id={record.id} />
            <DeleteOutlined
              onClick={() => {
                showDeleteConfirm(
                  record,
                  'deleteProduct',
                  'product',
                  setProductData
                )
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
        <span>Products</span>
        <AddProduct render={render} setRender={setRender} />
      </div>
      <Table
        columns={columns}
        dataSource={ProductData}
        rowKey={updateIndex}
        scroll={{ y: 445 }}
        loading={ProductData ? false : true}
        className='tableStyle'
      />
    </div>
  )
}
export default Products
