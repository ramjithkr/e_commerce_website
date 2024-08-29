import { Footer } from "../componets/Footer";
import { UserHeader } from "../componets/user/UserHeader";
import { Outlet } from "react-router-dom";  

export const UserLayout = () => {
  return (
    <div>
      <UserHeader />
      <div className="min-h-96">
      <Outlet />
      </div>

      <Footer />
    </div>
  );
};
