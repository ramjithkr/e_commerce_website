import { useState } from "react";
import { Link } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import DarkMode from "../ui/DarkMode";

export const AdminHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative flex items-center justify-between w-full h-20 px-6 md:px-20 shadow-xl">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button on the Left */}
        <button
          className="md:hidden block text-xl"
          onClick={toggleMobileMenu}
        >
          &#9776;
        </button>

        {/* Logo */}
        <h1 className="text-2xl md:text-4xl font-bold">Logo</h1>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-4 md:gap-10 font-semibold">
        <Link to={"/admin/home"} className="hover:text-blue-500 font-sans">
          Home
        </Link>
        <Link to={"/admin/products"} className="hover:text-blue-500 font-sans">
          Products
        </Link>
        <Link
          to={"/admin/dashboard/create-product"}
          className="hover:text-blue-500 font-sans"
        >
          Dashboard
        </Link>
      </nav>

      {/* Dark Mode and Profile Icons */}
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

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white flex flex-col items-center md:hidden shadow-xl z-50">
          <Link
            to="/admin/home"
            className="hover:text-blue-500 font-sans py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/admin/products"
            className="hover:text-blue-500 font-sans py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/admin/dashboard/create-product"
            className="hover:text-blue-500 font-sans py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};
