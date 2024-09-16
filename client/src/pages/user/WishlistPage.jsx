import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash, ShoppingCart } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

export const WishlistPage = () => {
  const [products, setProducts] = useState([]);
  console.log("products===>", products);
  // Fetch wishlist products
  const fetchWishlistProducts = async () => {
    try {
      const response = await axiosInstance({
        url: "/wishlist/get",
        method: "GET",
        withCredentials: true,
      });
      if (response?.data?.data) {
        setProducts(response?.data?.data);
      } else {
        toast.error("No items found in your wishlist");
      }
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch wishlist products");
    }
  };

  useEffect(() => {
    fetchWishlistProducts();
  }, []);

  // Remove item from wishlist
  const handleRemove = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this item from your wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance({
            url: `/wishlist/remove/${id}`,
            method: "DELETE",
            withCredentials: true,
          });
          if (response?.data?.success) {
            setProducts((prevProducts) =>
              prevProducts.filter((item) => item._id !== id)
            );
            Swal.fire("Removed!", "Your item has been removed.", "success");
          } else {
            toast.error("Failed to remove item");
          }
        } catch (error) {
          console.error(error);
          toast.error("Error removing product");
        }
      }
    });
  };

  const addProductToUserCart = async (id, quantity = 1) => {
    try {
      const response = await axiosInstance({
        url: `/cart/add/${id}`,
        method: "POST",
        withCredentials: true,
        data: { quantity }, // you can change this depending on your API requirements
      });

      if (response?.data?.message === "Product added to cart successfully") {
        toast.success("Product added to cart successfully!");
      } else {
        toast.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding product to cart");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-100 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-5xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">
          Your Wishlist
        </h1>
        {products.length === 0 ? (
          <p className="text-lg text-gray-600 text-center">
            Your wishlist is empty. Start adding your favorite products!
          </p>
        ) : (
          <div className="space-y-8">
            {products.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-6 border border-gray-200 rounded-xl shadow-lg bg-gradient-to-tr from-green-50 to-white"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={item.product.image} // Assuming 'product' is the field containing product details
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl shadow-sm"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {item.product.name}
                    </h2>
                    <p className="text-lg text-gray-700">
                      ${item.product.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => addProductToUserCart(item.product._id)}
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
                  >
                    <ShoppingCart className="inline-block mr-2" size={20} />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8 text-center">
          <Link
            to="/user/product"
            className="inline-block bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-3 px-8 rounded-xl hover:from-purple-600 hover:to-purple-800 transition duration-300 shadow-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
