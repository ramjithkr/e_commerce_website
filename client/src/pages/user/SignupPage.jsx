import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export const SignupPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formValid, setFormValid] = useState(true);

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFormValid(false);
      return;
    }
    setFormValid(true);
    setShowPopup(true);
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-6xl">
        {/* Sign Up Form on the Right */}
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl lg:ml-12">
          <form className="card-body" onSubmit={handleSignup}>
            <h2 className="text-4xl font-bold text-center mb-6">Sign Up</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="input input-bordered"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {!formValid && (
                <p className="text-red-500 text-sm mt-2">Passwords do not match.</p>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full" type="submit">
                Sign Up
              </button>
            </div>
            <div className="form-control mt-4 text-center">
              <span className="text-sm">
                Already have an account?{" "}
                <Link to="/login" className="link link-hover text-primary">
                  Login here
                </Link>
              </span>
            </div>
          </form>
        </div>

        {/* Welcome Text on the Left */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Join Us Today!</h1>
          <p className="py-6 text-lg">
            Create an account to start your journey with us.
          </p>
        </div>
      </div>

      {/* Animated Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50"
          >
            <h2 className="text-xl font-semibold">Signup Successful</h2>
            <p className="text-sm">Your account has been created successfully.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
