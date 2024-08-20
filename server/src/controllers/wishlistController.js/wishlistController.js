import mongoose from "mongoose";
import { User } from "../../models/userModel.js";
import { Product } from "../../models/productModel.js";
import { Wishlist } from "../../models/wishlistModel.js"; // Import the Wishlist model

// Add a product to the wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { id, productId } = req.body;

    // Find the user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is already in the wishlist
    const existingWishlistItem = await Wishlist.findOne({
      user: id,
      product: productId,
    });
    if (existingWishlistItem) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    // Create a new wishlist entry
    const wishlistItem = new Wishlist({
      user: id,
      product: productId,
    });
    await wishlistItem.save();

    res
      .status(200)
      .json({ message: "Product added to wishlist", wishlistItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Remove a product from the wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { id, productId } = req.params;

    // Find the wishlist item
    const wishlistItem = await Wishlist.findOneAndDelete({
      user: id,
      product: productId,
    });

    if (!wishlistItem) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    res
      .status(200)
      .json({ message: "Product removed from wishlist", wishlistItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Received parameters:", req.params);

    // Validate the user ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Query the Wishlist
    const wishlist = await Wishlist.find({ user: id }).populate("product");

    console.log("Wishlist Query Result:", wishlist);

    // Check if the wishlist is empty
    if (!wishlist || wishlist.length === 0) {
      return res.status(404).json({ message: "No items in wishlist" });
    }

    // Send the response
    res.status(200).json({ wishlist });
  } catch (error) {
    console.error("Error in getWishlist:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
