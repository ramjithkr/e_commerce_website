

export const UserProfile = () => {
  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <div className="flex justify-center mb-4">
          <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="w-24 h-24 rounded-full shadow-md"
          />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">John Doe</h2>
        <p className="text-center text-gray-600 mb-4">johndoe@example.com</p>
        <div className="flex justify-between items-center space-x-4">
          <button className="btn btn-primary w-1/2">
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="btn btn-secondary w-1/2 bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
