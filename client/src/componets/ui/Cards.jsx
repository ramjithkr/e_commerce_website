/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const ProductCards = ({ product }) => {
  return (
    <div className="card bg-base-100 w-full md:w-80 lg:w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-lg overflow-hidden">
      <figure className="h-60 overflow-hidden">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </figure>
      <div className="card-body p-5 flex flex-col">
        <h2 className="card-title text-lg font-semibold text-gray-800 mb-2">
          {product?.brand}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{product?.desc}</p>
        <p className="text-xl font-bold text-indigo-600 mb-4">
          ₹{product?.price}
        </p>
        <div className="card-actions mt-auto">
          <Link to={`/user/product-details/${product._id}`}>
            <button className="btn btn-primary w-full">More Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const AdminProductCards = ({ product }) => {
  return (
    <div className="card bg-base-100 w-full md:w-80 lg:w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-lg overflow-hidden">
      <figure className="h-60 overflow-hidden">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </figure>
      <div className="card-body p-5 flex flex-col">
        <h2 className="card-title text-lg font-semibold text-gray-800 mb-2">
          {product?.brand}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{product?.desc}</p>
        <p className="text-xl font-bold text-indigo-600 mb-4">
          ₹{product?.price}
        </p>
        <div className="card-actions mt-auto">
          <Link to={`/user/product-details/${product._id}`}>
            <button className="btn btn-primary w-full">More Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
