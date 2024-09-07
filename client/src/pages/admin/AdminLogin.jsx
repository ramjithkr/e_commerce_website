import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminLogin } from "../../services/adminApi";

export const AdminLoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await adminLogin(data);

      if (response && response.success) {
        toast.success("Successfully logged in as Admin");
        navigate("/admin/home"); // Single toast message
      } else {
        toast.error(response?.message || "Admin Login failed");
      }
    } catch (error) {
      toast.error("Login failed: Admin not found or incorrect password");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-6xl">
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl lg:ml-12">
          <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
            <h2 className="text-4xl font-bold text-center mb-6">Admin Login</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Admin Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your admin email"
                className="input input-bordered"
                {...register("email", {
                  required: "Admin email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Admin Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your admin password"
                className="input input-bordered"
                {...register("password", {
                  required: "Admin password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full" type="submit">
                Admin Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
