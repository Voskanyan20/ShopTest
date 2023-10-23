import { Button, Form, Input, Modal } from 'antd'
import { useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import { PutProduct } from '../../../../utils/Route'
import { cancel } from '../../../../utils/Messages'

const UpdateProduct = ({ render, setRender, id, nameProp , descriptionProp , priceProp , imageProp }) => {
  const [name, setName] = useState(nameProp)
  const [description, setDescription] = useState(descriptionProp)
  const [price, setPrice] = useState(priceProp)
  const [image, setImage] = useState(imageProp)
  const [open, setOpen] = useState(false)

  const updateProduct = async () => {
    const result = await PutProduct(id, name, description , price , image , render, setRender)
    setRender(result)
    setOpen(false)
  }
  const Cancel = () => {
    cancel()
    setOpen(false)
  }
  return (
    <>
      <EditOutlined
        onClick={() => {
          setOpen(true)
        }}
      />
      <Modal
        title='Update Product'
        centered
        open={open}
        footer={null}
        onCancel={() => {
          cancel()
          setOpen(false)
        }}
        width={500}
        destroyOnClose
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          layout='horizontal'
          style={{ maxWidth: 800 }}
          onFinish={() => {
            updateProduct()
            setRender(!render)
          }}
        >
          <Form.Item
            label='Name'
            name='name'
            initialValue={name}
            rules={[
              { required: true, message: 'Please Input Name!' },
              { min: 3 }
            ]}
            hasFeedback
          >
            <Input value={name} onChange={e => setName(e.target.value)} />
          </Form.Item>
          <Form.Item
            label='Description'
            name='description'
            initialValue={description}
            rules={[
              { required: true, message: 'Please Input Description!' },
              { min: 5 }
            ]}
            hasFeedback
          >
            <Input value={description} onChange={e => setDescription(e.target.value)} />
          </Form.Item>
          <Form.Item
            label='Price'
            name='price'
            initialValue={price}
            rules={[
              { required: true, message: 'Please Input Price!' },
            ]}
            hasFeedback
          >
            <Input type='number' value={price} onChange={e => setPrice(e.target.value)} />
          </Form.Item>
          <Form.Item
            label='Image'
            name='imageUrl'
            initialValue={image}
            rules={[
              { required: true, message: 'Please Input Url!' },
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
                Update
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default UpdateProduct
