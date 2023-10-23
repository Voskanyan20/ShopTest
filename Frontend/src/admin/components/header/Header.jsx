import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "antd";
import { getCookie, setCookie } from '../../../login/LoginAcces.jsx';


export default function Header() {
    return (
        <div className="header">
            <div className="border-table headerDirection">
                <div>Logo</div>
                <div>
                    <Link to='/login'>
                        <Button onClick={() => {
                            setCookie('token', null, null);
                            getCookie('token');
                        }} type={"text"}>Log Out</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
