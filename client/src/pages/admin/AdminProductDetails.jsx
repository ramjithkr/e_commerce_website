import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useEffect, useState } from "react";

export const AdminProductDetails = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState(null);

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
      }
    };

    fetchProductDetails();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <img src={productDetails?.image} alt="" />
      <h1>{productDetails?.title}</h1>
      <p>{productDetails?.desc}</p>
      <p>Price: ₹{productDetails?.price}</p>
      <p>Brand: {productDetails?.brand}</p>
      {/* Add more product details as needed */}
      <h1>haiii</h1>
    </div>
  );
};
