import { Link } from "react-router-dom";
import { CircleUserRound} from "lucide-react";
import DarkMode from "../ui/DarkMode";

export const AdminHeader = () => {
  return (
    <div className="flex items-center justify-between w-full h-20 px-6 md:px-20 shadow-xl">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold">Logo</h1>
      </div>
      <nav className="hidden md:flex gap-4 md:gap-10 font-semibold">
        <Link to={"/admin/home"} className="hover:text-blue-500 font-sans">
          Home
        </Link>
        <Link to={"/admin/products"} className="hover:text-blue-500 font-sans">
          Products
        </Link>
        <Link to={"/admin/dashboard"} className="hover:text-blue-500 font-sans">
          Dashboard
        </Link>
      </nav>
      <div className="flex items-center gap-5">
        <DarkMode />
        <div className="flex items-center gap-4">
  
          <Link to={"/admin/profile"}>
            <CircleUserRound
              size={24}
              className="hover:text-blue-300 cursor-pointer"
            />
          </Link>
        
        </div>
      </div>
    </div>
  );
};
