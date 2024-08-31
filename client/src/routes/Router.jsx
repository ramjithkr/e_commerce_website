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
        element: <About/>
      },
      {
        path: "contact", 
        element: <ContactUs/>
      },
      {
        path: "collections",
        element: <h1>Collections Page</h1>,
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
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "about", 
        element: <About/>
      },
      {
        path: "contact",
        element: <ContactUs/>
      },
      {
        path: "collections", 
        element: <h1>User Collections Page</h1>,
      },
      {
        path: "product-details/:id", 
        element: <ProductDetails />,
      },
      {
        path: "wishlist", 
        element: <WishlistPage/>,
      },
    ],
  },
]);
