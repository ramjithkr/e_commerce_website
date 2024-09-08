import { useState } from "react";

export const ContactUsPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-300 via-gray-100 to-white p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg transform hover:scale-105 transition-transform duration-500">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Contact Us
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
              id="message"
              name="message"
              rows="5"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <button
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-purple-900 transition duration-300"
            type="submit"
          >
            Send Message
          </button>
        </form>
        {submitted && (
          <div className="mt-6 text-center">
            <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg inline-block">
              Your message has been sent successfully!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
