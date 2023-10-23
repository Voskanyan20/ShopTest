import { RouterProvider } from 'react-router-dom'
import router from './router/Router'

const Routes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default Routes
