import { Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { cancel, error, succesDelete } from '../../../utils/Messages'
import instance from '../../../utils/axios'
import { getCookie } from '../../../login/LoginAcces'
const { confirm } = Modal

const showDeleteConfirm = (record, apiName, name, data) => {
  confirm({
    title: 'Are you sure delete this action?',
    icon: <ExclamationCircleFilled />,
    content: `${name} name is (${record.title}):`,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk () {
      data(item => {
        return item.filter(item => item.id !== record.id)
      })
      instance
        .delete(`/${apiName}/${record.id}`, {
          headers: { Authorization: `Bearer ${getCookie('token')}` }
        })
        .then(() => {
          succesDelete()
        })
        .catch(err => error(err.message))
    },
    onCancel () {
      cancel()
    }
  })
}

const deleteBasketProduct = (record, apiName, render, setRender) => {
  confirm({
    title: 'Are you sure delete this Item?',
    icon: <ExclamationCircleFilled />,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk () {
      instance
        .delete(`/${apiName}/${record.id}`, {
          headers: { Authorization: `Bearer ${getCookie('token')}` }
        })
        .then(resp => {
          setRender(!render)
          succesDelete()
          return true
        })
        .catch(err => {
          error(err.message)
          return false
        })
    },
    onCancel () {
      cancel()
    }
  })
}

export { showDeleteConfirm, deleteBasketProduct }
