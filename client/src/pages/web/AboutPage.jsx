import { Link } from "react-router-dom";

export const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h1>
        <p className="text-lg text-gray-600 mb-4">
          We are passionate about delivering the best products and services to
          our customers. Our journey is fueled by innovation, creativity, and a
          desire to exceed expectations.
        </p>
        <p className="text-lg text-gray-600 mb-4">
          Our team works tirelessly to ensure your satisfaction and aims to
          provide value in every interaction. Thank you for choosing us.
        </p>
        <Link
          to="/contact"
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
};
