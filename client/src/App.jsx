import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Toaster } from 'react-hot-toast';
import { router } from "./routes/Router";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster/>
    </>
  );
}
