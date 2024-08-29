import { Link } from "react-router-dom";
import DarkMode from "./ui/DarkMode";

export const Header = () => {
  return (
    <div className="flex items-center justify-between w-full h-20 px-6 md:px-20 shadow-xl">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold">Logo</h1>
      </div>
      <nav className="hidden md:flex gap-4 md:gap-10 font-semibold">
        <Link to={"/"} className="hover:text-blue-500">
          Home
        </Link>
        <Link to={"/about"} className="hover:text-blue-500">
          About
        </Link>
        <Link to={"/contacts"} className="hover:text-blue-500">
          Contacts
        </Link>
        <Link to={"/products"} className="hover:text-blue-500">
          Products
        </Link>
      </nav>
      <div className="flex items-center gap-5">
        <DarkMode />
        <div className="flex items-center gap-4">
          <button className="btn btn-primary">Join us</button>
        </div>
      </div>
    </div>
  );
};
