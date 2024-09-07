import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 p-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h6 className="text-lg font-bold mb-4">Services</h6>
          <nav>
            <a className="block link link-hover mb-2">Branding</a>
            <a className="block link link-hover mb-2">Design</a>
            <a className="block link link-hover mb-2">Marketing</a>
            <a className="block link link-hover mb-2">Advertisement</a>
          </nav>
        </div>
        <div>
          <h6 className="text-lg font-bold mb-4">Company</h6>
          <nav>
            <a className="block link link-hover mb-2">About Us</a>
            <a className="block link link-hover mb-2">Contact</a>
            <a className="block link link-hover mb-2">Jobs</a>
            <a className="block link link-hover mb-2">Press Kit</a>
          </nav>
        </div>
        <div>
          <h6 className="text-lg font-bold mb-4">Legal</h6>
          <nav>
            <a className="block link link-hover mb-2">Terms of Use</a>
            <a className="block link link-hover mb-2">Privacy Policy</a>
            <a className="block link link-hover mb-2">Cookie Policy</a>
            <Link to={"/adminlogin"}>
            <p className="block link link-hover mb-2">Admin Login</p>
            </Link>
          
          </nav>
        </div>
        <div>
          <h6 className="text-lg font-bold mb-4">Newsletter</h6>
          <form>
            <fieldset className="flex flex-col">
              <label className="mb-2">
                <span className="text-sm">Enter your email address</span>
              </label>
              <div className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="username@site.com"
                  className="input input-bordered w-full rounded-md mb-2 sm:mb-0 sm:rounded-l-md"
                />
                <button className="btn btn-primary rounded-md sm:rounded-l-none">Subscribe</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      <div className="container mx-auto mt-10 flex flex-col sm:flex-row justify-between items-center border-t border-gray-700 pt-5">
        <p className="text-center sm:text-left">&copy; 2024 Your Company. All rights reserved.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <a href="#" className="link link-hover">Facebook</a>
          <a href="#" className="link link-hover">Twitter</a>
          <a href="#" className="link link-hover">Instagram</a>
        </div>
      </div>
    </footer>
  );
};