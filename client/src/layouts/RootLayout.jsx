import { Outlet } from "react-router-dom";
import { Footer } from "../componets/Footer";
import { Header } from "../componets/Header";
import { SummerSaleBanner } from "../pages/Home/SummerSaileBanner";

export const RootLayout = () => {
  return (
    <div>
      <SummerSaleBanner/>
      <Header />
      <div className="min-h-96">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
