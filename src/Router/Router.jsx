import { createBrowserRouter } from 'react-router';
import Root from '../Layout/Root/Root';
import Home from '../Pages/Home/Home';
import ProductsDetails from '../Pages/ProductDetails/ProductsDetails';
import Statistics from '../Components/Admin/Statistics/Statistics';
import AdminRoot from '../Layout/Admin/AdminRoot';
import AllProducts from '../Pages/Adnin/AllProducts/Allproducts';
import AddProduct from '../Pages/Adnin/AddProduct/AddProduct';
import Order from '../Pages/Adnin/Order/Order';
import Search from '../Pages/Search/Search';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'products-details/:id',
        Component: ProductsDetails,
      },
      {
        // শুধু /search → query string থেকে value আসবে
        path: 'search',
        Component: Search,
      },
    ],
  },
  {
    path: '/admin',
    Component: AdminRoot,
    children: [
      {
        index: true,
        Component: Statistics,
      },
      {
        path: '/admin/all-products',
        Component: AllProducts,
      },
      {
        path: '/admin/add-product',
        Component: AddProduct,
      },
      {
        path: '/admin/orders',
        Component: Order,
      },
    ],
  },
]);
