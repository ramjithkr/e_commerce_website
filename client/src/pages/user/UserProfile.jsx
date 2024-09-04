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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img
            src={user.profile}
            alt="User Avatar"
            className="w-32 h-32 rounded-full shadow-md object-cover"
          />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-2 uppercase">
          {user.name}
        </h2>
        <p className="text-center text-gray-600 mb-2">
          <span className="font-semibold ">Email:</span> {user.email}
        </p>
        <p className="text-center text-gray-600 mb-4">
          <span className="font-semibold">Mobile:</span> {user.mobile}
        </p>
        <div className="flex flex-col gap-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Edit Profile
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
