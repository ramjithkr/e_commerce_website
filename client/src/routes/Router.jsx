import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage } from "./../pages/user/HomePage";
import { LoginPage } from "./../pages/user/LoginPage";
import { SignupPage } from "./../pages/user/SignupPage";
import { UserLayout } from "../layouts/UserLayout";
// import { Product } from "../pages/user/Product";
import { ProductDetails } from "../pages/user/ProductDetails";
import { ErrorPage } from "../pages/errorPage/errorPage";


export const router = createBrowserRouter([
  {
    path: "/",
    errorElement:<ErrorPage/>,
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    // path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "/user/product",
        // element: <Product />,
        element : <h1>Product</h1>
      },
      {
        path: "/user/product-details/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);
