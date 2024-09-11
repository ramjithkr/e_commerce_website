import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useEffect, useState } from "react";

export const AdminProductDetails = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosInstance({
          url: `/admin/details/${id}`,
          method: "GET",
          withCredentials: true,
        });
        if (response?.data?.data) {
          setProductDetails(response.data.data);
        } else {
          setError("Product details not found");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch product details");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center py-24">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-24 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="text-gray-700 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap bg-white p-8 shadow-lg rounded-lg">
            <img
              alt={productDetails?.title || "Product Image"}
              className="lg:w-1/2 w-full object-cover object-center rounded-lg border border-gray-300 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              src={productDetails?.image || "https://via.placeholder.com/500"}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase mb-1">
                {productDetails?.brand || "Unknown Brand"}
              </h2>
              <h1 className="text-gray-900 text-4xl title-font font-semibold mb-3">
                {productDetails?.title || "Product Title"}
              </h1>
              <p className="leading-relaxed text-base text-gray-600 mb-5">
                {productDetails?.desc || "Product description not available."}
              </p>
              <div className="flex items-center mb-5">
                <span className="title-font font-semibold text-2xl text-gray-900">
                  ₹{productDetails?.price || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
