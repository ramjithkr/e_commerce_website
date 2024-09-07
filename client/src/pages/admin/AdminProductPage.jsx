import  { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { ProductCards } from "../../componets/ui/Cards";

export const AdminProductPage = () => {
  const [Product, setProduct] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance({
        url: "/admin/getAllProducts",
        method: "GET",
        withCredentials: true,
      });
      setProduct(response?.data?.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="px-4 md:px-20 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">List of Products</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Product.map((value) => (
          <ProductCards key={value._id} product={value} />
        ))}
      </div>
    </div>
  );
};
