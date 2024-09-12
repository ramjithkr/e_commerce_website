import { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";

export const GetUsersList = () => {
  const [userData, setUserData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Fetch the user list on component mount
  useEffect(() => {
    getUserList();
  }, []);

  // Function to get the list of users
  const getUserList = async () => {
    try {
      const response = await axiosInstance({
        url: "/admin/getuserlist",
        method: "GET",
        withCredentials: true,
      });
      setUserData(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to show the confirmation modal
  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  // Function to confirm delete
  const confirmDelete = async () => {
    try {
      const response = await axiosInstance({
        url: `/admin/deleteUser/${selectedUserId}`,
        method: "DELETE",
        withCredentials: true,
      });

      if (response.data.success) {
        alert(response.data.message);
        getUserList(); // Refresh the user list after deletion
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setShowModal(false); // Close the modal after action
    }
  };

  return (
    <div className="overflow-x-auto p-5">
      <table className="table-auto w-full text-left border-separate border-spacing-0">
        {/* Table head */}
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="p-3">Photo</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Date Created</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="text-gray-700 text-sm font-light">
          {userData.map((user) => (
            <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="p-3">
                <img
                  src={user.photo || "/path/to/default-image.jpg"} 
                  alt="User"
                  onError={(e) => { e.target.src = "/path/to/default-image.jpg"; }} // Fallback if image doesn't load
                  className="h-12 w-12 rounded-full"
                />
              </td>
              <td className="p-3">
                <span className="font-medium">{user.name}</span>
              </td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="p-3 text-center">
                <button
                  className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
                  onClick={() => handleDeleteClick(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white p-6 rounded-lg z-10 shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this user? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                onClick={() => setShowModal(false)} // Cancel button
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
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
