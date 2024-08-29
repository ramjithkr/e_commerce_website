import { Outlet } from "react-router-dom";
import { Footer } from "../componets/Footer";
import { Header } from "../componets/Header";

export const RootLayout = () => {
  return (
    <div>
      <Header />
      <div className="min-h-96">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
