import { Button, Form, Input, Modal } from 'antd'
import { useState } from 'react'
import { PostProducts } from '../../../../utils/Route'
import { cancel } from '../../../../utils/Messages'

const AddProduct = ({ render, setRender }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [open, setOpen] = useState(false)

  const AddProducts = async () => {
    PostProducts(name, description, price, image, render, setRender)
    setOpen(false)
  }
  const Cancel = () => {
    cancel()
    setOpen(false)
  }
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Add Product
      </Button>
      <Modal
        title='Add Product'
        centered
        open={open}
        footer={null}
        onCancel={() => {
          cancel()
          setOpen(false)
        }}
        destroyOnClose
        width={500}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          layout='horizontal'
          style={{ maxWidth: 800 }}
          onFinish={() => {
            AddProducts()
            setName('')
          }}
        >
          <Form.Item
            label='Name'
            name='Name'
            rules={[
              { required: true, message: 'Please input Name!' },
              { min: 3 }
            ]}
            hasFeedback
          >
            <Input value={name} onChange={e => setName(e.target.value)} />
          </Form.Item>
          <Form.Item
            label='Description'
            name='description'
            rules={[
              { required: true, message: 'Please input Description!' },
              { min: 3 }
            ]}
            hasFeedback
          >
            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label='Price'
            name='price'
            rules={[
              { required: true, message: 'Please input Price!' },
              { min: 1 }
            ]}
            hasFeedback
          >
            <Input
              type='number'
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label='Image'
            name='image'
            rules={[
              { required: true, message: 'Please input Img path!' },
              { min: 3 }
            ]}
            hasFeedback
          >
            <Input value={image} onChange={e => setImage(e.target.value)} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className='modalButton'>
              <Button onClick={Cancel}>Cancel</Button>
              <Button type='primary' htmlType='submit'>
                Add
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default AddProduct
