

export const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
        <p className="text-lg mb-6 text-center">
          Welcome to <span className="font-semibold">Your E-commerce Store Name</span> – your one-stop shop for 
          <span className="italic"> trendy, quality products</span>. We are passionate about bringing you the latest 
          and most unique products that cater to your needs and desires.
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-lg">
            At <span className="font-semibold">Your E-commerce Store Name</span>, our journey began with a simple idea: 
            to create a platform that offers quality products, an easy shopping experience, and unparalleled customer 
            satisfaction. Since our inception, we’ve grown into a trusted brand with a wide range of handpicked products.
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg">
            Our mission is to provide top-quality products at competitive prices, delivered right to your doorstep with 
            the convenience and reliability you deserve. We strive to make every shopping experience with us 
            seamless and enjoyable.
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Why Shop With Us?</h2>
          <ul className="list-disc list-inside text-lg">
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


