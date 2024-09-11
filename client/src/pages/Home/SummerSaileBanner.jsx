import { Link } from "react-router-dom";

export const SummerSaleBanner = () => {
  return (
    <div className="bg-black py-2 px-4 text-center text-white font-semibold flex flex-col md:flex-row items-center justify-center">
      <p className="text-sm md:text-base mb-2 md:mb-0 md:mr-4">
        Summer Sale For All Mens-Pendant -{" "}
        <span className="font-bold">50% OFF</span> & Free Express Delivery!
      </p>
      <Link
        className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-full text-xs md:text-sm font-semibold transition duration-300 ease-in-out"
        to={"/user/product"}
      >
        {" "}
        Shop Now
      </Link>
    </div>
  );
};
