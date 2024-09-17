export const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center sm:text-5xl">
          About Us
        </h1>
        <p className="text-lg mb-6 text-center sm:text-xl">
          Welcome to <span className="font-semibold">Your E-commerce Store Name</span> – your one-stop shop for
          <span className="italic"> trendy, quality products</span>. We are passionate about bringing you the latest
          and most unique products that cater to your needs and desires.
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-xl mb-8 border-l-4 border-blue-500">
          <h2 className="text-2xl font-semibold mb-4 sm:text-3xl">Our Story</h2>
          <p className="text-lg sm:text-xl">
            At <span className="font-semibold">Your E-commerce Store Name</span>, our journey began with a simple idea:
            to create a platform that offers quality products, an easy shopping experience, and unparalleled customer
            satisfaction. Since our inception, we’ve grown into a trusted brand with a wide range of handpicked products.
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-xl mb-8 border-l-4 border-green-500">
          <h2 className="text-2xl font-semibold mb-4 sm:text-3xl">Our Mission</h2>
          <p className="text-lg sm:text-xl">
            Our mission is to provide top-quality products at competitive prices, delivered right to your doorstep with
            the convenience and reliability you deserve. We strive to make every shopping experience with us
            seamless and enjoyable.
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-xl border-l-4 border-yellow-500">
          <h2 className="text-2xl font-semibold mb-4 sm:text-3xl">Why Shop With Us?</h2>
          <ul className="list-disc list-inside text-lg sm:text-xl">
            <li>Wide selection of premium quality products</li>
            <li>Competitive prices and exclusive offers</li>
            <li>Fast, reliable, and secure shipping</li>
            <li>Excellent customer service and support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
