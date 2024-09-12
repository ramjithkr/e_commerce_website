import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

export const UpdateProduct = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const watchImage = watch("image");
  
  const [currentImage, setCurrentImage] = useState("");
  const [currentName, setCurrentName] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance({
          url: `/product/update/${id}`,
          method: "GET",
          withCredentials: true,
        });
        if (response && response.product) {
          const { title, desc, brand, price, category, stock, ratings, image } =
            response.product;
          setValue("title", title);
          setValue("desc", desc);
          setValue("brand", brand);
          setValue("price", price);
          setValue("category", category);
          setValue("stock", stock);
          setValue("ratings", ratings);
          setCurrentImage(image); // Set current image URL
          setCurrentName(title);  // Set current product title
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch product details");
      }
    };

    fetchProduct();
  }, [id, setValue]);

  const handleUpdateProduct = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("desc", data.desc);
      formData.append("brand", data.brand);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("stock", data.stock);
      formData.append("ratings", data.ratings);
      if (watchImage && watchImage[0]) {
        formData.append("image", watchImage[0]);
      }

      const response = await axiosInstance({
        url: `/product/update/${id}`,
        method: "PUT",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response && response.success) {
        toast.success("Product updated successfully");
        navigate("/admin/products");
      }
    } catch (error) {
      console.error(error);
      toast.error("Update Product Failed");
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      setCurrentImage(file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-8">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
          Update Product
        </h2>
        <div className="mb-8 text-center">
          <img
            src={currentImage}
            alt="Current Product"
            className="mx-auto mb-4 w-32 h-32 object-cover rounded-lg"
          />
          <p className="text-lg font-semibold text-gray-800">{currentName}</p>
        </div>
        <form
          className="space-y-6"
          encType="multipart/form-data"
          onSubmit={handleSubmit(handleUpdateProduct)}
        >
          {/* Title */}
          <div className="form-group">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2 text-lg"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter Product Title"
              {...register("title", { required: "Title is required" })}
              className="block w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            {errors.title && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label
              htmlFor="desc"
              className="block text-gray-700 font-medium mb-2 text-lg"
            >
              Description
            </label>
            <textarea
              id="desc"
              placeholder="Enter Product Description"
              {...register("desc", { required: "Description is required" })}
              className="block w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            {errors.desc && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.desc.message}
              </span>
            )}
          </div>

          {/* Brand */}
          <div className="form-group">
            <label
              htmlFor="brand"
              className="block text-gray-700 font-medium mb-2 text-lg"
            >
              Brand
            </label>
            <input
              id="brand"
              type="text"
              placeholder="Enter Product Brand"
              {...register("brand", { required: "Brand is required" })}
              className="block w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            {errors.brand && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.brand.message}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="form-group">
            <label
              htmlFor="price"
              className="block text-gray-700 font-medium mb-2 text-lg"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              placeholder="Enter Product Price"
              {...register("price", { required: "Price is required" })}
              className="block w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            {errors.price && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.price.message}
              </span>
            )}
          </div>

          {/* Category */}
          <div className="form-group">
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium mb-2 text-lg"
            >
              Category
            </label>
            <input
              id="category"
              type="text"
              placeholder="Enter Product Category"
              {...register("category", { required: "Category is required" })}
              className="block w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            {errors.category && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.category.message}
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="form-group">
            <label
              htmlFor="stock"
              className="block text-gray-700 font-medium mb-2 text-lg"
            >
              Stock
            </label>
            <input
              id="stock"
              type="number"
              placeholder="Enter Available Stock"
              {...register("stock", { required: "Stock is required" })}
              className="block w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            {errors.stock && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.stock.message}
              </span>
            )}
          </div>

          {/* Ratings */}
          <div className="form-group">
            <label
              htmlFor="ratings"
              className="block text-gray-700 font-medium mb-2 text-lg"
            >
              Ratings
            </label>
            <input
              id="ratings"
              type="number"
              step="0.1"
              max="5"
              min="0"
              placeholder="Enter Product Ratings"
              {...register("ratings", { required: "Ratings are required" })}
              className="block w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            {errors.ratings && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.ratings.message}
              </span>
            )}
          </div>

          {/* Image */}
          <div className="form-group">
            <label
              htmlFor="image"
              className="block text-gray-700 font-medium mb-2 text-lg"
            >
              Product Image
            </label>
            <input
              id="image"
              type="file"
              {...register("image")}
              onChange={handleImageChange} // Handle image change to update preview
              className="block w-full text-gray-700 bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 cursor-pointer file:bg-blue-600 file:text-white file:border-0 file:rounded-lg file:py-2 file:px-4 transition duration-300 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="form-group mt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
