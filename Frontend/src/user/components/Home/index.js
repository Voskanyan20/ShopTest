import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import { getCookie, setCookie } from '../../../login/LoginAcces'
import Main from './Main'
import '../../index.css'
import { removeFromLocalStorage } from '../../../utils/Route'

const Home = () => {
  const navigate = useNavigate()

  const handleSignIn = event => {
    event.preventDefault()
    navigate('/login')
  }

  const handleSignOut = event => {
    event.preventDefault()
    setCookie('token', null, null)
    getCookie('token')
    removeFromLocalStorage('userId')
    navigate('/')
  }

  return (
    <>
      <Header handleSignOut={handleSignOut} handleSignIn={handleSignIn} />
      <Main />
    </>
  )
}

export default Home
