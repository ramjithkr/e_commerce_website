import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// for users

export const UserMensBracelete = () => {
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [lastTap, setLastTap] = useState(0); // State for last tap time

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance({
        url: "/product/productlist",
        method: "GET",
        withCredentials: true,
      });
      setProducts(response?.data?.data || []); // Ensure products is always an array
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on category
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === "mens-bracelete"
  );

  const handleImageClick = (imageUrl) => {
    const currentTime = Date.now();
    const tapDelay = 300; // Time in milliseconds to consider as a double-tap

    if (currentTime - lastTap < tapDelay) {
      // Handle double-tap
      setSelectedImage(imageUrl);
      setIsModalOpen(true);
    }
    setLastTap(currentTime);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Caption */}
      <h2 className="text-4xl font-bold text-center mb-8">Mens Bracelete</h2>
      <div className="flex overflow-x-auto no-scrollbar p-8">
        <div className="flex gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="relative flex-shrink-0 w-96 cursor-pointer group"
              onClick={() => handleImageClick(product.image)} // Handle click for double-tap
            >
              <img
                src={product.image} // Use the image URL from the product
                alt={product.title} // Use the title from the product for accessibility
                className="w-full h-80 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
              {/* Button */}
              <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 bg-opacity-60 p-4 rounded-lg">
                <Link to={`/user/product-details/${product._id}`}>
                  <button className="bg-gray-800 text-white rounded-lg py-2 px-4 border border-transparent hover:bg-gray-700 transition-colors duration-300">
                    More Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative bg-white p-4 rounded-lg">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto max-w-screen-sm max-h-screen"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// for root users

export const RootMensBracelete = () => {
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [lastTap, setLastTap] = useState(0); // State for last tap time

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance({
        url: "/product/rootproduct",
        method: "GET",
        withCredentials: true,
      });
      setProducts(response?.data?.data || []); // Ensure products is always an array
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on category
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === "mens-bracelete"
  );

  const handleImageClick = (imageUrl) => {
    const currentTime = Date.now();
    const tapDelay = 300; // Time in milliseconds to consider as a double-tap

    if (currentTime - lastTap < tapDelay) {
      // Handle double-tap
      setSelectedImage(imageUrl);
      setIsModalOpen(true);
    }
    setLastTap(currentTime);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Caption */}
      <h2 className="text-4xl font-bold text-center mb-8">Mens Bracelete</h2>
      <div className="flex overflow-x-auto no-scrollbar p-8">
        <div className="flex gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="relative flex-shrink-0 w-96 cursor-pointer group"
              onClick={() => handleImageClick(product.image)} // Handle click for double-tap
            >
              <img
                src={product.image} // Use the image URL from the product
                alt={product.title} // Use the title from the product for accessibility
                className="w-full h-80 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
              {/* Button */}
              <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 bg-opacity-60 p-4 rounded-lg">
                <Link to={`/user/product-details/${product._id}`}>
                  <button className="bg-gray-800 text-white rounded-lg py-2 px-4 border border-transparent hover:bg-gray-700 transition-colors duration-300">
                    More Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative bg-white p-4 rounded-lg">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto max-w-screen-sm max-h-screen"
            />
          </div>
        </div>
      )}
    </div>
  );
};
