/* eslint-disable react/no-unescaped-entities */
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userLogin } from "../../services/userApi";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await userLogin(data);

      if (response && response.success) { // Assuming `success` is a key in your response indicating login success
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error(response?.message || "Login failed");
      }
    } catch (error) {
      toast.error("Login failed: User not found or incorrect password");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-6xl">
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl lg:ml-12">
          <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
            <h2 className="text-4xl font-bold text-center mb-6">Login</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                {...register("email", {
                  required: "Email is required",
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
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                {...register("password", {
                  required: "Password is required",
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
              <label className="label mt-4">
                <span className="label-text-alt">
                  Don't have an account?{" "}
                  <Link to="/signup" className="link link-hover text-primary">
                    Sign up here
                  </Link>
                </span>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>

        {/* Welcome Text on the Left */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Welcome Back!</h1>
          <p className="py-6 text-lg">
            We're happy to see you again. Log in to access your account and
            continue where you left off.
          </p>
        </div>
      </div>
    </div>
  );
};
