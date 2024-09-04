import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage } from "./../pages/user/HomePage";
import { LoginPage } from "./../pages/user/LoginPage";
import { SignupPage } from "./../pages/user/SignupPage";
import { UserLayout } from "../layouts/UserLayout";
import { ProductDetails } from "../pages/user/ProductDetails";
import { ErrorPage } from "../pages/errorPage/ErrorPage";
import { ContactUs } from "../pages/web/ContactUs";
import { About } from "../pages/web/about";
import { WishlistPage } from "../pages/user/WishlistPage";
import { UserProfile } from "../pages/user/UserProfile";
import { CartPage } from "../pages/user/CartPage";
import { UserAuth } from "./protectedRoutes/UserAuth";
import { AdminLayout } from "../layouts/AdminLayout";
import { ProductPage } from "../pages/user/ProductPage";

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
        element: <About />,
      },
      {
        path: "contact",
        element: <ContactUs />,
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
        element: <About />,
      },

      {
        path: "contact",
        element: <ContactUs />,
      },

      {
        path: "products",
        element: <ProductPage/>,
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
    path: "admin",
    element: (
      // <UserAuth>
      <AdminLayout />
      // </UserAuth>
    ),
    children: [
      {
        path: "dashboard",
        element: <h1>Admin Dashboard Page</h1>,
      },
    ],
  },
]);
