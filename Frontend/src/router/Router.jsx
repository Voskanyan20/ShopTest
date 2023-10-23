import {
  createBrowserRouter,
  Route,
  createRoutesFromElements
} from 'react-router-dom'
import Login from '../login/Login'
import Users from '../admin/components/main/users/Users'
import Layout from '../admin/components/layout/Layout'
import PrivateRoutes from '../utils/PrivateRoutes'
import Home from '../user/components/Home'
import Products from '../admin/components/main/products/Products'
import SignUp from '../login/SignUp'
import Basket from '../user/components/Basket/Basket'
import PaySuccess from '../user/components/Pay/PaySuccess'
import NotFound from '../utils/NotFound'
import Payments from '../admin/components/main/payments/Payments'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route element={<PrivateRoutes />}>
          <Route exact path='/admin' element={<Layout />}>
            <Route index={'users'} element={<Users />} />
            <Route path={'users'} element={<Users />} />
            <Route path={'products'} element={<Products />} />
            <Route path={'payments'} element={<Payments />} />
          </Route>
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/basket' element={<Basket />} />
        <Route path='/paySuccess' element={<PaySuccess />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </>
  )
)
export default router
