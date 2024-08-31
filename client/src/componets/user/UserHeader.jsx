import { Link } from "react-router-dom";
import { CircleUserRound, BookHeart, ShoppingCart } from "lucide-react";
import DarkMode from "../ui/DarkMode";

export const UserHeader = () => {
  return (
    <div className="flex items-center justify-between w-full h-20 px-6 md:px-20 shadow-xl">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold">Logo</h1>
      </div>
      <nav className="hidden md:flex gap-4 md:gap-10 font-semibold">
        <Link to={"/"} className="hover:text-blue-500 font-sans">
          Home
        </Link>
        <Link
          to={"/user/collections"}
          className="hover:text-blue-500 font-sans"
        >
          Collections
        </Link>
        <Link to={"/about"} className="hover:text-blue-500 font-sans">
          About
        </Link>
        <Link to={"/contact"} className="hover:text-blue-500 font-sans">
          Contact
        </Link>
      </nav>
      <div className="flex items-center gap-5">
        <DarkMode />
        <div className="flex items-center gap-4">
          <Link to={"/user/wishlist"}>
            <BookHeart
              size={24}
              className="hover:text-blue-500 cursor-pointer"
            />
          </Link>
          <CircleUserRound
            size={24}
            className="hover:text-blue-300 cursor-pointer"
          />
          <ShoppingCart
            size={24}
            className="hover:text-blue-300 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
