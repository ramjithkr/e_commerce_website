/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const ProductCards = ({ product }) => {
  return (
    <div className="card bg-base-100 w-full md:w-80 lg:w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-lg overflow-hidden flex flex-col items-center">
      <figure className="w-full h-60 overflow-hidden">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </figure>
      <div className="card-body p-5 flex flex-col items-center text-center">
        {/* <h2 className="text-lg font-semibold text-gray-800 mb-2">
        {product?.brand}
      </h2> */}
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          {product?.title}
        </h1>
        <p className="text-xl font-bold text-indigo-600 mb-4">
          ₹{product?.price}
        </p>
        <div className="card-actions mt-auto w-full">
          <Link to={`/user/product-details/${product._id}`}>
            <button className="btn btn-primary w-full bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors duration-300">
              More Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const AdminProductCards = ({ product }) => {
  return (
    <div className="card bg-base-100 w-full md:w-80 lg:w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-lg overflow-hidden flex flex-col items-center">
      <figure className="w-full h-60 overflow-hidden">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </figure>
      <div className="card-body p-5 flex flex-col items-center text-center">
        {/* <h2 className="text-lg font-semibold text-gray-800 mb-2">
        {product?.brand}
      </h2> */}
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          {product?.title}
        </h1>
        <p className="text-xl font-bold text-indigo-600 mb-4">
          ₹{product?.price}
        </p>
        <div className="card-actions mt-auto w-full">
          <Link to={`/admin/product-details/${product._id}`}>
            <button className="btn btn-primary w-full bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors duration-300">
              More Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";

export const AdminDeleteProductCards = ({ product, onDelete }) => {
  const [showModal, setShowModal] = useState(false); // Modal state to control visibility

  const handleDeleteClick = () => {
    setShowModal(true); // Show modal when delete is clicked
  };

  const confirmDelete = () => {
    setShowModal(false); // Close modal
    onDelete(); // Call the delete function passed via props
  };

  return (
    <div className="card bg-base-100 w-full md:w-80 lg:w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-lg overflow-hidden flex flex-col items-center">
      <figure className="w-full h-60 overflow-hidden">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </figure>
      <div className="card-body p-5 flex flex-col items-center text-center">
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          {product?.title}
        </h1>
        <p className="text-xl font-bold text-indigo-600 mb-4">
          ₹{product?.price}
        </p>
        <div className="card-actions mt-auto w-full flex gap-2">
          <Link to={`/admin/product-details/${product._id}`}>
            <button className="btn w-full bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors duration-300">
              View Product
            </button>
          </Link>
          <button
            className="btn w-full bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 transition-colors duration-300"
            onClick={handleDeleteClick} // Show modal on click
          >
            Delete Product
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white p-6 rounded-lg z-10 shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="btn bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                onClick={() => setShowModal(false)} // Cancel button
              >
                Cancel
              </button>
              <button
                className="btn bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                onClick={confirmDelete} // Confirm delete
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
