/* eslint-disable react/no-unescaped-entities */

import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-100 to-white p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          About Us
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to our website! We are committed to providing high-quality products and exceptional customer service. Our team is dedicated to ensuring your satisfaction and creating a seamless experience for you.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Our mission is to deliver innovative solutions and unparalleled value to our customers. We pride ourselves on our integrity, creativity, and dedication to excellence. Whether you're looking for the latest products or need assistance, we're here to help.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for visiting our site. If you have any questions or feedback, please feel free to contact us. We're always happy to hear from you!
        </p>
        <div className="text-center">
          <Link
            to="/contact"
            className="inline-block bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold py-2 px-6 rounded-xl hover:from-purple-700 hover:to-purple-900 transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};
