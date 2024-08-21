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

export const createProduct = async (req, res) => {
  try {
    const { title, desc, brand, price, category, stock, ratings } = req.body;

    console.log("image====", req.file);
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const product = await Product.findOne({ title: title });

    if (product) {
      return res
        .status(400)
        .json({ success: false, message: "Product is already exist" });
    }

    const uploadResult = await cloudinaryInstance.uploader
      .upload(req.file.path, { folder: "e_commerce_website" })
      .catch((error) => {
        console.error(error);
      });

    console.log(uploadResult);
    const newProduct = new Product({
      title,
      desc,
      brand,
      price,
      category,
      stock,
      ratings,
    });
    if (uploadResult?.url) {
      newProduct.image = uploadResult.url;
    }

    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "new product created successfuly",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updatedProduct = async (req, res) => {
  try {
    const { title, desc, image, brand, price, category, stock, ratings } =
      req.body;
    const id = req.prams.id;

    const updatedProduct = await Product.findOneAndUpdate(
      id,
      { title, desc, image, brand, price, category, stock, ratings },
      { new: true }
    );
    res.status(200).json({
      sucess: false,
      message: "products are updated",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};
