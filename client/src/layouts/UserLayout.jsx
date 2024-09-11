import { Footer } from "../componets/Footer";
import { UserHeader } from "../componets/user/UserHeader";
import { Outlet } from "react-router-dom";  
import {SummerSaleBanner} from "../pages/Home/SummerSaileBanner";

export const UserLayout = () => {
  return (
    <div>
      <SummerSaleBanner/>
      <UserHeader />
      <div className="min-h-96">
      <Outlet />
      </div>

      <Footer />
    </div>
  );
};
