import * as React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Form } from 'antd';
import { useNavigate } from "react-router-dom";
import { signUp } from '../utils/Route';

function SignUp() {
    const navigate = useNavigate();
    const handleSubmit = (values) => {
        signUp(values.username, values.password, navigate);
    }
    return (
        <div className="login">
            <Form
                name="normal_login"
                className="loginForm"
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="username"
                    className="m-5"
                    label='Login'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} />
                </Form.Item>
                <Form.Item
                    name="password"
                    className="m-5"
                    label='Password'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                    />
                </Form.Item>

                <Form.Item
                className="m-5"
                >
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default SignUp