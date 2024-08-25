import { Link } from "react-router-dom";
import { CircleUserRound } from 'lucide-react';
import DarkMode from "./ui/DarkMode";

export const Header = () => {
  return (
    <div className="flex items-center justify-between w-full h-20 px-6 md:px-20 shadow-xl">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold">Logo</h1>
      </div>
      <nav className="hidden md:flex gap-4 md:gap-10 font-semibold">
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/contacts"}>Contacts</Link>
      </nav>
      <div className="flex items-center gap-5 size-30">
        <div className="flex items-center">
          <DarkMode />
        </div>
        <div className="flex items-center">
          <CircleUserRound size={30} />
        </div>
      </div>
    </div>
  );
};
