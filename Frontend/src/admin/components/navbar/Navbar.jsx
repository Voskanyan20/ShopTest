import * as React from 'react';
import { CreditCardOutlined, ProjectOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import { useState } from 'react';

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem(
        <Link to={"users"}> Users </Link>,
        '1',
        <UserOutlined />
    ),
    getItem(
        <Link to={"products"}> Products </Link>,
        '2',
        <ProjectOutlined />
    ),
    getItem(
        <Link to={"payments"}> Payments </Link>,
        '3',
        <CreditCardOutlined />
    )
];

export default function Navbar() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <Layout>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ background: "white" }}>
                    <Menu
                        items={items}
                    />
                </Sider>
            </Layout>
        </>
    );
}
