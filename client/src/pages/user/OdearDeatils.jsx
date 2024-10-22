import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

export const OdearDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance({
          url: `/user/odear/${id}`,
          method: "GET",
          withCredentials: true,
        });

        if (response?.data) {
          setOrderDetails(response.data);
        } else {
          setError("Order details not found");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError(" No order details available");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) return <div className="text-center py-6">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-6">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Order Details</h1>
      {orderDetails ? (
        <div className="space-y-4">
          <p className="text-lg">
            <strong>Total Amount:</strong> ₹ {orderDetails.totalPrice}
          </p>

          <h2 className="text-2xl font-semibold mt-8 text-gray-800">
            Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {orderDetails.products.map((product, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-gray-50 hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <div className="text-center">
                  <p className="font-bold text-xl mb-2 text-gray-700">
                    {product.title}
                  </p>
                  <p className="text-gray-600">
                    <strong>Price:</strong> ₹ {product.price}
                  </p>
                  <p className="text-gray-600">
                    <strong>Quantity:</strong> {product.quantity}
                  </p>
                  <p className="text-gray-600">
                    <strong>Status: Processing</strong>
                    {/* {product.status} */}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-700 py-6">
          No order details available
        </div>
      )}
    </div>
  );
};
