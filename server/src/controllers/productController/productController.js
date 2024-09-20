import { cloudinaryInstance } from "../../config/cloudneryConfig.js";
import { Product } from "../../models/productModel.js";

export const getProductList = async (req, res) => {
  try {
    const productList = await Product.find();
    res.status(200).json({
      success: true,
      message: "fetche product list",
      data: productList,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const productDetails = await Product.findById(id);

    res.status(200).json({
      success: true,
      message: "fetche product Details",
      data: productDetails,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, desc, brand, price, category, stock, ratings } = req.body;

    console.log("image====", req.file);

    // Check if the image is provided
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    // Check if the product with the same title already exists
    const existingProduct = await Product.findOne({ title: title });
    if (existingProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product already exists" });
    }

    let uploadResult;
    try {
      // Upload image to Cloudinary
      uploadResult = await cloudinaryInstance.uploader.upload(req.file.path, {
        folder: "e_commerce_website",
      });
      console.log("Cloudinary upload result:====", uploadResult);
    } catch (uploadError) {
      console.error("Cloudinary upload error:=====", uploadError);
      return res.status(500).json({
        success: false,
        message: "Failed to upload image",
      });
    }

    try {
      // Create a new product
      const newProduct = new Product({
        title,
        desc,
        brand,
        price,
        category,
        stock,
        ratings: [],
        image: uploadResult?.url, // Use the uploaded image URL
      });

      // Save the product to the database
      await newProduct.save();
      console.log("Product created successfully:", newProduct);
      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (error) {
      console.error("Error saving product to database:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to save product",
      });
    }
  } catch (error) {
    console.error("Error in creating product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update Product
export const updatedProduct = async (req, res) => {
  try {
    const { title, desc, image, brand, price, category, stock, ratings } =
      req.body;
    const id = req.params.id;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { title, desc, image, brand, price, category, stock, ratings },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get Single Product
export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// root hompage getRootProduct

export const getRootProduct = async (req, res) => {
  try {
    const productList = await Product.find();
    res.status(200).json({
      success: true,
      message: "fetche product list",
      data: productList,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
