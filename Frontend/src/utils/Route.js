import { getCookie, setCookie } from '../login/LoginAcces'
import {
  error,
  loginError,
  signUpError,
  succesLogin,
  succesPost,
  succesPut
} from './Messages'
import instance from './axios'

const getFromLocalStorage = key => {
  return localStorage.getItem(key)
}

const removeFromLocalStorage = key => {
  localStorage.removeItem(key)
}

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, value)
}

const login = async (username, password, navigate) => {
  instance
    .post(`/login/`, { login: username, password: password })
    .then(resp => {
      setCookie('token', resp.data.token, 180000000)
      if (resp.status === 200) {
        succesLogin(username)
        saveToLocalStorage('userId', resp.data.user.id)
        if (resp.data.user.role === 'admin') {
          navigate('/admin')
        } else if (resp.data.user.role === 'client') {
          navigate('/')
        }
      }
    })
    .catch(() => {
      loginError()
    })
}

const signUp = async (login, password, navigate) => {
  instance
    .post(`/signUp`, { login: login, password: password })
    .then(resp => {
      if (resp) {
        navigate('/login')
      }
    })
    .catch(() => {
      signUpError()
    })
}

////User

const getUsers = async setUserData => {
  return await instance
    .get(`/getUsers`, {
      headers: { Authorization: `Bearer ${getCookie('token')}` }
    })
    .then(resp => {
      setUserData(resp.data)
    })
    .catch(err => {
      error(err.message)
    })
}

///Product

const getProducts = async setProductsData => {
  return await instance
    .get('/getProducts/', {
      headers: { Authorization: `Bearer ${getCookie('token')}` }
    })
    .then(resp => {
      setProductsData(resp.data)
      return true
    })
    .catch(err => {
      error(err.message)
      return false
    })
}

const PostProducts = async (
  name,
  description,
  price,
  imageUrl,
  render,
  setRender
) => {
  await instance
    .post(
      '/createProduct/',
      {
        name: name,
        description: description,
        price: price,
        imageUrl: imageUrl
      },
      { headers: { Authorization: `Bearer ${getCookie('token')}` } }
    )
    .then(() => {
      setRender(!render)
      succesPost()
    })
    .catch(err => {
      error(err.message)
    })
}

const PutProduct = async (id, name, description, price, image, render) => {
  await instance
    .put(
      `/updateProduct/${id}`,
      {
        name: name,
        description: description,
        price: price,
        imageUrl: image,
        status: 'published'
      },
      { headers: { Authorization: `Bearer ${getCookie('token')}` } }
    )
    .then(() => {
      succesPut()
      return !render
    })
    .catch(err => {
      error(err.message)
      return false
    })
}

///Basket

const getBasketProducts = async (userId, setBasketProductData) => {
  return await instance
    .get(`/getBasketProducts/${userId}`, {
      headers: { Authorization: `Bearer ${getCookie('token')}` }
    })
    .then(resp => {
      setBasketProductData(resp.data)
      return true
    })
    .catch(err => {
      error(err.message)
      return false
    })
}

const PostBasketProduct = async (id, productId, render, setRender) => {
  await instance
    .post(
      `/addToBasket/${id}`,
      {
        productId: productId
      },
      { headers: { Authorization: `Bearer ${getCookie('token')}` } }
    )
    .then(() => {
      setRender(!render)
      succesPost()
    })
    .catch(err => {
      error(err.message)
    })
}

const BasketProductQuantityChange = async (
  id,
  productId,
  render,
  setRender,
  quantityMethod
) => {
  await instance
    .post(
      `/changeQuantity/${id}`,
      {
        productId: productId,
        quantityMethod: quantityMethod
      },
      { headers: { Authorization: `Bearer ${getCookie('token')}` } }
    )
    .then(() => {
      setRender(!render)
      succesPost()
    })
    .catch(err => {
      error(err.message)
    })
}

/// Payment

const payCheckout = async (data, userId, totalPrice) => {
  console.log('data', data)
  await instance
    .post(
      `/create-checkout-session`,
      {
        data,
        userId: userId,
        totalPrice
      },
      { headers: { Authorization: `Bearer ${getCookie('token')}` } }
    )
    .then(res => {
      if (res.data.url) {
        window.location.href = res.data.url
      }
      // setRender(!render)
      succesPost()
    })
    .catch(err => {
      error(err.message)
    })
}

const getUsePayments = async setPaymentsData => {
  return await instance
    .get('/getAllPayments/', {
      headers: { Authorization: `Bearer ${getCookie('token')}` }
    })
    .then(resp => {
      setPaymentsData(resp.data)
      return true
    })
    .catch(err => {
      error(err.message)
      return false
    })
}

const getPaymentsById = async (id, setUserPaymentData) => {
  return await instance
    .get(`/getPaymentsById/${id}`, {
      headers: { Authorization: `Bearer ${getCookie('token')}` }
    })
    .then(resp => {
      setUserPaymentData(resp.data)
      return true
    })
    .catch(err => {
      error(err.message)
      return false
    })
}

export {
  login,
  signUp,
  getProducts,
  PostProducts,
  PutProduct,
  getUsers,
  removeFromLocalStorage,
  getFromLocalStorage,
  getBasketProducts,
  PostBasketProduct,
  BasketProductQuantityChange,
  payCheckout,
  getUsePayments,
  getPaymentsById
}
