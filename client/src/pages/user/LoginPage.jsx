import { Link } from "react-router-dom";
export const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col lg:flex-row items-center lg:justify-between bg-gray-800 p-10 rounded-lg shadow-xl w-full max-w-4xl">
        <div className="mb-8 lg:mb-0 lg:mr-10">
          <h1 className="text-4xl font-bold mb-4">Login now!</h1>
          <p className="text-lg text-gray-300">
            Welcome back! Please login to your account.
          </p>
        </div>
        <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-sm">
          <form>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Password"
                required
              />
              <div className="text-right mt-2">
                <Link to={"/signup"}>
                <a
                
                  className="text-sm text-purple-400 hover:text-purple-500"
                >
                  New User ?
                </a></Link>
               
              </div>
            </div>
            <button className="w-full py-3 mt-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
