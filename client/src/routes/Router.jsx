import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage } from "./../pages/user/HomePage";
import { LoginPage } from "./../pages/user/LoginPage";
import { SignupPage } from "./../pages/user/SignupPage";
import { UserLayout } from "../layouts/UserLayout";
import { ProductDetails } from "../pages/user/ProductDetails";
import { ErrorPage } from "../pages/errorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    children: [
      {
        path: "", // Root homepage
        element: <HomePage />,
      },
      {
        path: "about", // About page at root
        element: <h1>About Page</h1>,
      },
      {
        path: "contact", // Contact page at root
        element: <h1>Contact Page</h1>,
      },
      {
        path: "collections", // Products page at root
        element: <h1>Collections Page</h1>,
      },
      {
        path: "login", // Login page at root
        element: <LoginPage />,
      },
      {
        path: "signup", // Signup page at root
        element: <SignupPage />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "about", // About page under user context
        element: <h1>About Page for User</h1>,
      },
      {
        path: "contact", // Contact page under user context
        element: <h1>Contact Page for User</h1>,
      },
      {
        path: "collections", // Products page under user context
        element: <h1>User Collections Page</h1>,
      },
      {
        path: "product-details/:id", // Product details for a specific product under user context
        element: <ProductDetails />,
      },
    ],
  },
]);
