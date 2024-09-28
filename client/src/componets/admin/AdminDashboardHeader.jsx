import { Link } from "react-router-dom";

export const AdminDashboardHeader = () => {
  return (
    <nav className="bg-gray-800 text-white px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/admin/dashboard">Admin Dashboard</Link>
        </div>

        {/* Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/admin/dashboard/get-users-details"
            className="hover:text-gray-400 transition duration-200"
          >
            User Details
          </Link>
          <Link
            to="/admin/dashboard/create-product"
            className="hover:text-gray-400 transition duration-200"
          >
            Create Product
          </Link>
          <Link
            to="/admin/dashboard/crud-product"
            className="hover:text-gray-400 transition duration-200"
          >
            Delete / update
          </Link>
          <Link
            to="/admin/dashboard/user-oders"
            className="block text-white py-2 hover:bg-gray-600 rounded transition duration-200"
          >
            User Orders
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button
            className="text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={() =>
              document.getElementById("mobile-menu").classList.toggle("hidden")
            }
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="md:hidden hidden bg-gray-700 p-4 rounded-md mt-2"
      >
        <Link
          to="/admin/dashboard/create-product"
          className="block text-white py-2 hover:bg-gray-600 rounded transition duration-200"
        >
          Create Product
        </Link>
        <Link
          to="/admin/dashboard/delete-product"
          className="block text-white py-2 hover:bg-gray-600 rounded transition duration-200"
        >
          Delete Product
        </Link>
        <Link
          to="/admin/dashboard/user-oders"
          className="block text-white py-2 hover:bg-gray-600 rounded transition duration-200"
        >
          User Orders
        </Link>
      </div>
    </nav>
  );
};
