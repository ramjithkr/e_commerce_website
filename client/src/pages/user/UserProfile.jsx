import { useNavigate } from "react-router-dom";
import { fetchUserProfile, userLogout } from "../../services/userApi";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export const UserProfile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await userLogout();
    if (response) {
      toast.success("Logout successful");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUserProfile(setUser);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full border border-gray-300">
        <div className="flex justify-center mb-6">
          <img
            src={user.profile}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-teal-500 shadow-lg object-cover"
          />
        </div>
        <h2 className="text-center text-3xl font-semibold text-gray-900 mb-4 uppercase">
          {user.name}
        </h2>
        <p className="text-center  text-gray-700 mb-3 ">
          <span className="font-medium text-gray-800">Email:</span> {user.email}
        </p>
        <p className="text-center text-gray-700 mb-6 uppercase">
          <span className="font-medium text-gray-800">Mobile:</span>{" "}
          {user.mobile}
        </p>
        <div className="flex flex-col gap-4">
          <button className="bg-teal-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300 uppercase">
            Edit Profile
          </button>
          <button
            className="bg-red-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 uppercase"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
