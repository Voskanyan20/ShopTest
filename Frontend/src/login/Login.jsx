import * as React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Input, Form } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../utils/Route'

function Login () {
  const navigate = useNavigate()
  const handleSubmit = values => {
    login(values.username, values.password, navigate)
  }
  return (
    <>
      <Button onClick={() => navigate('/')}>Shop</Button>
      <div className='login'>
        <Form
          name='normal_login'
          className='loginForm'
          initialValues={{
            remember: true
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name='username'
            className='m-5'
            label='Username'
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input prefix={<UserOutlined className='site-form-item-icon' />} />
          </Form.Item>
          <Form.Item
            name='password'
            className='m-5'
            label='Password'
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
            />
          </Form.Item>

          <Form.Item className='m-5'>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <Link to={'/signUp'}>Create Accaunt</Link>
      </div>
    </>
  )
}
export default Login
