import { Table } from 'antd'
import { useEffect, useState } from 'react'
import SearchFunc from '../../search'
import { getUsers } from '../../../../utils/Route'
import { showDeleteConfirm } from '../../delete'
import { DeleteOutlined } from '@ant-design/icons'

const Users = () => {
  const [render] = useState(false)
  const [userData, setUserData] = useState(null)
  let lastIndex = 0
  const updateIndex = () => {
    lastIndex++
    return lastIndex
  }

  useEffect(() => {
    async function fetchData () {
      await getUsers(setUserData)
    }
    fetchData()
  }, [render])

  const [columns] = useState([
    {
      title: 'Login',
      dataIndex: 'login',
      ...SearchFunc('login')
    },
    {
      title: 'Role',
      dataIndex: 'role',
      ...SearchFunc('role')
    },
    {
      title: 'Actions',
      render: record => {
        return (
          <div className='actionsIcons'>
            {record.role === 'admin' ? null : (
              <DeleteOutlined
                onClick={() => {
                  showDeleteConfirm(record, 'deleteUser', 'user', setUserData)
                }}
                className='deleteIcons'
              />
            )}
          </div>
        )
      }
    }
  ])

  return (
    <div className='main'>
      <div className='mainTitle'>
        <span>Users</span>
      </div>
      <Table
        columns={columns}
        rowKey={updateIndex}
        dataSource={userData}
        scroll={{ y: 445 }}
        loading={userData ? false : true}
        className='tableStyle'
      />
    </div>
  )
}
export default Users
