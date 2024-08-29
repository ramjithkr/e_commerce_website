import React from "react";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center p-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          404
        </h1>
        <p className="text-2xl font-light text-gray-600 mb-8">
          Oops! The page you are looking for does not exist.
        </p>
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-indigo-500 rounded-full animate-bounce"></div>
        </div>
        <Link
          to="/"
          className="px-8 py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};
