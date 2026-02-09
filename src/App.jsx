import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import './App.css'
import Header from './compuntes/Header'
import Home from './compuntes/Home'
import Products from './compuntes/Products'

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
        { path: "Products", element: <Products /> },
        { path: "Products/:id", element: <></> },
        { path: "cart", element: <></> },
        { path: "login", element: <></> },
        { path: "profile", element: <></> }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App