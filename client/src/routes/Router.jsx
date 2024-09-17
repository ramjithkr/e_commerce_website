import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { SignupPage } from "./../pages/user/SignupPage";
import { UserLayout } from "../layouts/UserLayout";
import { ProductDetails } from "../pages/user/ProductDetails";
import { ErrorPage } from "../pages/errorPage/ErrorPage";
import { UserProfile } from "../pages/user/UserProfile";
import { UserAuth } from "./protectedRoutes/UserAuth";
import { ProductPage } from "../pages/user/ProductPage";
import { LoginPage } from "../pages/user/LoginPage";
import { AdminLoginPage } from "../pages/admin/AdminLogin";
import { AdminAuth } from "./protectedRoutes/AdminAuth";
import { CreateProduct } from "../pages/admin/CreateProduct";
import { AdminLayout } from "./../layouts/AdminLayout";
import { AdminProfile } from "../pages/admin/AdminProfile";
import { AdminProductPage } from "../pages/admin/AdminProductPage";
import { AboutPage } from "../pages/web/AboutPage";
import { ContactUsPage } from "./../pages/web/ContactUsPage";
import { CartPage } from "../pages/user/CartPage";
import { AdminProductDetails } from "../pages/admin/AdminProductDetails";
import { AdminDashboardLayout } from "../layouts/AdminDashboardLayout";
import { CrudProduct } from "../pages/admin/CrudProduct";
import { UpadteOders } from "../pages/admin/UpadteOders";
import { UpdateProduct } from "../pages/admin/UpdateProduct";
import { WishlistPage } from "../pages/user/WishlistPage";
import { UserHomePage } from "../pages/user/UserHomePage";
import { RootHomePage } from './../pages/root/RootHomePage';
import { GetUsersList } from "../pages/admin/GetUsersList";
import { AdminHome } from "../pages/admin/adminHome";



export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <RootHomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactUsPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    path: "user",
    element: (
      <UserAuth>
        <UserLayout />
      </UserAuth>
    ),
    children: [
      {
        path: "home",
        element: <UserHomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },

      {
        path: "contact",
        element: <ContactUsPage />,
      },

      {
        path: "product",
        element: <ProductPage />,
      },
      {
        path: "product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
  {
    path: "adminlogin",
    element: <AdminLoginPage />,
  },
  {
    path: "admin",
    element: (
      <AdminAuth>
        <AdminLayout />
      </AdminAuth>
    ),
    children: [
      {
        path: "home",
        element: <AdminHome/>
      },

      {
        path: "profile",
        element: <AdminProfile />,
      },
      {
        path: "products",
        element: <AdminProductPage />,
      },
      {
        path: "product-details/:id",
        element: <AdminProductDetails />,
      },

      {
        path: "dashboard",
        element: <AdminDashboardLayout />,
        children: [
          {
            path: "create-product",
            element: <CreateProduct />,
          },
          {
            path: "crud-product",
            element: <CrudProduct />,
          },
          {
            path: "update-user-oders",
            element: <UpadteOders />,   ///  not complete
          },
          {
            path: "update-product/:id",
            element: <UpdateProduct />,   // not completed error in cloudnery
          },
          {
            path: "get-users-details",
            element: <GetUsersList/>,
          },
        ],
      },
    ],
  },
]);
