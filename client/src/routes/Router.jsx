import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage } from "./../pages/user/HomePage";
import { SignupPage } from "./../pages/user/SignupPage";
import { UserLayout } from "../layouts/UserLayout";
import { ProductDetails } from "../pages/user/ProductDetails";
import { ErrorPage } from "../pages/errorPage/ErrorPage";
import { WishlistPage } from "../pages/user/WishlistPage";
import { UserProfile } from "../pages/user/UserProfile";
import { CartPage } from "../pages/user/CartPage";
import { UserAuth } from "./protectedRoutes/UserAuth";
import { ProductPage } from "../pages/user/ProductPage";
import { LoginPage } from "../pages/user/LoginPage";
import { AdminLoginPage } from "../pages/admin/AdminLogin";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { AdminAuth } from "./protectedRoutes/AdminAuth";
import { CreateProduct } from "../pages/admin/CreateProduct";
import { AdminLayout } from "./../layouts/AdminLayout";
import { AdminProfile } from "../pages/admin/AdminProfile";
import { AdminProductPage } from "../pages/admin/AdminProductPage";
import { AdminProductDetails } from "./../pages/admin/AdminProductDetails";
import { AboutPage } from "../pages/web/AboutPage";
import { ContactUsPage } from "./../pages/web/ContactUsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
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
        element: <HomePage />,
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
        element: <HomePage />,
      },

      {
        path: "dashboard",
        element: <AdminDashboard />,
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
        path: "create-product",
        element: <CreateProduct />,
      },
    ],
  },
]);
