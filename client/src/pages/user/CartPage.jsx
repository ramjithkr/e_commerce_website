import { useEffect, useState } from "react";
import { axiosInstance } from './../../config/axiosInstance';

export const CartPage = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const [error, setError] = useState(null);

  // Fetch Cart Products
  const fetchCartProducts = async () => {
    try {
      const response = await axiosInstance({
        url: "/cart/cartdetails",
        method: "GET",
        withCredentials: true,
      });

      if (response?.data?.data?.cart) {
        const allCartItems = response.data.data.cart.flatMap(cart => cart.items);
        setCartProduct(allCartItems);
      } else {
        setError("Product details not found");
      }
    } catch (error) {
      console.error("Failed to fetch product details:", error);
      setError("Failed to fetch product details");
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  // Handle Remove Product from Cart
  const handleRemoveProduct = async (id) => {
    try {
      const response = await axiosInstance({
        url: `/cart/remove/${id}`,
        method: "DELETE",  // Use DELETE method for removing
        withCredentials: true,
      });

      if (response.status === 200) {
        // Remove the product from local state after successfully removing from server
        setCartProduct((prev) => prev.filter(product => product.product._id !== id));
      }
    } catch (error) {
      console.error("Failed to remove product:", error);
      setError("Failed to remove product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

      <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
        {/* Cart Items Section */}
        <div className="rounded-lg md:w-2/3">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : cartProduct.length > 0 ? (
            cartProduct.map((product) => (
              <div
                key={product.product._id}
                className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
              >
                {/* Image Container */}
                <div className="w-full sm:w-40">
                  <img
                    src={product.product.image}
                    alt={product.product.title}
                    className="w-full rounded-lg"
                  />
                </div>

                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {product.product.title}
                    </h2>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-white">
                        -
                      </span>
                      <input
                        className="h-8 w-8 border bg-white text-center text-xs outline-none"
                        type="number"
                        readOnly
                        value={product.quantity}
                        min={1}
                      />
                      <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-white">
                        +
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm">${product.product.price}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        onClick={() => handleRemoveProduct(product.product._id)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty</p>
          )}
        </div>

        {/* Subtotal Section */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">$129.99</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$4.99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">$134.98 USD</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-white hover:bg-blue-600">
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};
