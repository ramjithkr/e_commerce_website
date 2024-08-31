import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash } from "lucide-react";

export const WishlistPage = () => {
  // Example state for wishlist items
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: "Product 1", price: "$20.00", image: "/path/to/image1.jpg" },
    { id: 2, name: "Product 2", price: "$30.00", image: "/path/to/image2.jpg" },
    { id: 3, name: "Product 3", price: "$40.00", image: "/path/to/image3.jpg" }
  ]);

  const handleRemove = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-200 via-green-100 to-white p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Your Wishlist
        </h1>
        {wishlistItems.length === 0 ? (
          <p className="text-lg text-gray-700 text-center">
            Your wishlist is empty. Browse our products and add your favorites!
          </p>
        ) : (
          <div className="space-y-6">
            {wishlistItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 border border-gray-300 rounded-xl shadow-md">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-gray-600">{item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash size={24} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 text-center">
          <Link
            to="/shop"
            className="inline-block bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold py-2 px-6 rounded-xl hover:from-purple-700 hover:to-purple-900 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
