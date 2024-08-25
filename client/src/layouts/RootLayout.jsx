import { Outlet } from "react-router-dom";
import { Footer } from "../componets/Footer";
import { Header } from "../componets/Header";

export const RootLayout = () => {
  return (
    <div>
      <Header />
      <Outlet/>
      <Footer/>
    </div>
  );
};
