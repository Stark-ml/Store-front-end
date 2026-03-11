import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Products from './components/Products'
import SingleProduct from './components/SingleProduct'
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "products", element: <Products /> },
        { path: "single-product/:id", element: <SingleProduct /> },
        { path: "cart", element: <></> },
        { path: "login", element: <></> },
        { path: "profile", element: <></> }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App