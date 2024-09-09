import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { useParams } from "react-router-dom";

export const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { id } = useParams(); // Extract the user ID from the URL parameters

  // Fetch cart products from the server
  const fetchCartProducts = async () => {
    try {
      const response = await axiosInstance({
        url: `/cart/getcartlist/${id}`, // Corrected URL format
        method: "GET", // Changed to GET to match typical REST conventions
        withCredentials: true,
      });

      if (response?.data?.data) {
        setCartItems(response.data.data);
        toast.success("Cart fetched successfully");
      } else {
        toast.error("No items in your cart");
      }
    } catch (error) {
      console.error("Error during fetch", error);
      toast.error("Failed to fetch cart items");
    }
  };

  useEffect(() => {
    if (id) {
      fetchCartProducts();
    }
  }, ); // Depend on 'id' to refetch when it changes

  // Handle incrementing item quantity
  const incrementQuantity = (itemId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Handle decrementing item quantity
  const decrementQuantity = (itemId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Handle removing item from the cart
  const removeItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cart-page">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div className="item-details flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">${item.price}</p>
                  <div className="quantity-controls flex items-center mt-2">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary mt-6">
            <h3 className="text-xl font-semibold">Total: ${getTotalPrice()}</h3>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};
