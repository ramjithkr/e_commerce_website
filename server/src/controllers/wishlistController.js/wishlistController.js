import mongoose from "mongoose";
import { User } from "../../models/userModel.js";
import { Product } from "../../models/productModel.js";
import { Wishlist } from "../../models/wishlistModel.js";

export const removeFromWishlist = async (req, res) => {
  try {
    const { id, productId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res.status(400).json({ message: "Invalid user or product ID" });
    }

    const wishlistItem = await Wishlist.findOneAndDelete({
      user: id,
      product: productId,
    });

    if (!wishlistItem) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    res
      .status(200)
      .json({ message: "Product removed from wishlist", data: wishlistItem });
  } catch (error) {
    console.error("Error in removeFromWishlist:", error);
    res.status(500).json({ message: "Server error", error });
  }
};



export const getWishlist = async (req, res) => {
  try {
    const user = req.user; // Get the authenticated user from the request
    // Fetch the user document
    const userId = await User.findOne({ email: user.email });

    // Fetch the wishlist items and populate the product field
    const wishlist = await Wishlist.find({ user: userId._id }).populate(
      "product"
    );

    return res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      data: wishlist,
    });
  } catch (error) {
    console.error("Error in getWishlist:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const addToWishlist = async (req, res) => {
  try {
    const user = req.user; // Assuming req.user contains the user object with email
    const productId = req.params.id; // Correctly extract the productId from req.params

    console.log("User ID:", user);
    console.log("Product ID:", productId);

    // Ensure the user is identified by their email
    const userExists = await User.findOne({ email: user.email });
    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Validate the productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID" });
    }

    // Find the product in the database
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Check if the product is already in the wishlist
    const existingWishlistItem = await Wishlist.findOne({
      user: userExists._id,
      product: productId,
    });
    if (existingWishlistItem) {
      return res
        .status(400)
        .json({ success: false, message: "Product already in wishlist" });
    }

    // Create a new wishlist entry
    const wishlistItem = new Wishlist({
      user: userExists._id,
      product: productId,
    });
    await wishlistItem.save();

    // Optionally update the user's wishlist field (if needed)
    userExists.wishlist.push(wishlistItem._id);
    await userExists.save();

    return res.status(200).json({
      success: true,
      message: "Product added to wishlist successfully",
      wishlistItem,
    });
  } catch (error) {
    console.error("Error in addToWishlist:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
};