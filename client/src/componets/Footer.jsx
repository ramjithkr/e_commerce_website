export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 p-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h6 className="text-lg font-bold mb-4">Services</h6>
          <nav>
            <a className="block link link-hover">Branding</a>
            <a className="block link link-hover">Design</a>
            <a className="block link link-hover">Marketing</a>
            <a className="block link link-hover">Advertisement</a>
          </nav>
        </div>
        <div>
          <h6 className="text-lg font-bold mb-4">Company</h6>
          <nav>
            <a className="block link link-hover">About us</a>
            <a className="block link link-hover">Contact</a>
            <a className="block link link-hover">Jobs</a>
            <a className="block link link-hover">Press kit</a>
          </nav>
        </div>
        <div>
          <h6 className="text-lg font-bold mb-4">Legal</h6>
          <nav>
            <a className="block link link-hover">Terms of use</a>
            <a className="block link link-hover">Privacy policy</a>
            <a className="block link link-hover">Cookie policy</a>
          </nav>
        </div>
        <div>
          <h6 className="text-lg font-bold mb-4">Newsletter</h6>
          <form>
            <fieldset className="flex flex-col">
              <label className="mb-2">
                <span className="text-sm">Enter your email address</span>
              </label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="username@site.com"
                  className="input input-bordered w-full rounded-l-md"
                />
                <button className="btn btn-primary rounded-r-md">Subscribe</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      <div className="container mx-auto mt-10 flex justify-between items-center border-t border-gray-700 pt-5">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="link link-hover">Facebook</a>
          <a href="#" className="link link-hover">Twitter</a>
          <a href="#" className="link link-hover">Instagram</a>
        </div>
      </div>
    </footer>
  );
};
