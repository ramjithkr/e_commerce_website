import { useState, useEffect } from 'react';
import { axiosInstance } from './../../config/axiosInstance';


export const CartPage = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const [error, setError] = useState(null);

  // Fetch Cart Products
  const fetchCartProducts = async () => {
    try {
      const response = await axiosInstance({
        url: '/cart/cartdetails',
        method: 'GET',
        withCredentials: true,
      });
      if (response?.data?.data) {
        setCartProduct(response?.data?.data); // Assuming cart details are in `data.items`
      } else {
        setError('Product details not found');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to fetch product details');
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const handleRemoveProduct = (productId) => {
    console.log(`Removing product with id: ${productId}`);
    // Implement the logic to remove the product from the cart
  };

  return (
    <div className="flex flex-col md:flex-row w-screen h-full px-14 py-7">
      {/* My Cart Section */}
      <div className="w-full flex flex-col h-fit gap-4 p-4">
        <p className="text-blue-900 text-xl font-extrabold">My cart</p>
        
        {/* Display error message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Display products if cartProduct is not empty */}
        {cartProduct.length > 0 ? (
          cartProduct.map((product) => (
            <div key={product.product._id} className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm">
              <div className="flex flex-col md:flex-row gap-3 justify-between">
                {/* Product Information */}
                <div className="flex flex-row gap-6 items-center">
                  <div className="w-28 h-28">
                    <img className="w-full h-full" src={product.product.image} alt={product.product.title} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-lg text-gray-800 font-semibold">{product.product.title}</p>
                    <p className="text-xs text-gray-600 font-semibold">
                      Color: <span className="font-normal">{product.color}</span>
                    </p>
                    <p className="text-xs text-gray-600 font-semibold">
                      Size: <span className="font-normal">{product.size}</span>
                    </p>
                  </div>
                </div>
                {/* Price Information */}
                <div className="self-center text-center">
                  <p className="text-gray-600 font-normal text-sm line-through">
                    ${product.product.originalPrice}
                    <span className="text-emerald-500 ml-2">({product.product.discount}% OFF)</span>
                  </p>
                  <p className="text-gray-800 font-normal text-xl">${product.product.price}</p>
                </div>
                {/* Remove Product Icon */}
                <div className="self-center">
                  <button onClick={() => handleRemoveProduct(product.product._id)}>
                    <svg height="24px" width="24px" viewBox="0 0 512 512">
                      <path d="M64 160l26 320c2.2 17 16.5 30 33.5 30h265c17 0 31.3-13 33.5-30l26-320H64zm278.8 289.6c-.5 8.4-7.5 15-15.9 15h-128c-8.4 0-15.4-6.6-15.9-15L171.8 192h168.5l2.5 257.6zM352 112l-9.4-28.2c-4.5-13.5-17-22.5-31-22.5H200.4c-14 0-26.5 9-31 22.5L160 112H64v32h384v-32H352zM272 256h-32v128h32V256zm-64 0h-32v128h32V256zm128 0h-32v128h32V256z" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* Product Quantity */}
              <div className="flex flex-row self-center gap-1">
                <button className="w-5 h-5 self-center rounded-full border border-gray-300">
                  {/* Decrement Quantity */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#d1d5db" strokeWidth={2}>
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <input
                  type="text"
                  readOnly
                  value={product.quantity}
                  className="w-8 h-8 text-center text-gray-900 text-sm outline-none border border-gray-300 rounded-sm"
                />
                <button className="w-5 h-5 self-center rounded-full border border-gray-300">
                  {/* Increment Quantity */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#9ca3af" strokeWidth={2}>
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Your cart is empty</p>
        )}
      </div>
    </div>
  );
};
