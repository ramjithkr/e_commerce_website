import Cart from "../../models/cartModel.js";
import { Product } from "../../models/productModel.js";
import mongoose from "mongoose";
import { User } from "../../models/userModel.js";

export const addProductToCart = async (req, res) => {
  try {
    const user = req.user; // Assuming the user is authenticated and attached to the request
    const { id: productId } = req.params; // Extract productId from route parameters
    const { quantity } = req.body; // Extract quantity from request body

    // Check if user exists in the database
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

    // Check if the product exists in the database
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Check if the product is already in the user's cart
    const existingCartItem = await Cart.findOne({
      user: userExists._id,
      "items.product": productId,
    });

    if (existingCartItem) {
      // If the product is already in the cart, update the quantity
      existingCartItem.items = existingCartItem.items.map((item) =>
        item.product.toString() === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      await existingCartItem.save();
      return res.status(200).json({
        success: true,
        message: "Product quantity updated in cart",
        cart: existingCartItem,
      });
    } else {
      // If the product is not in the cart, create a new cart item
      const newCartItem = new Cart({
        user: userExists._id,
        items: [{ product: productId, quantity }],
      });
      await newCartItem.save();

      // Add the new cart item to the user's cart reference
      userExists.cart.push(newCartItem._id);
      await userExists.save();

      return res.status(200).json({
        success: true,
        message: "Product added to cart successfully",
        cart: newCartItem,
      });
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCartList = async (req, res) => {
  try {
    const user = req.user; // Ensure user is attached by middleware

    // Fetch user's cart, including populated product details
    const cart = await User.findOne({ email: user.email }).populate({
      path: "cart",
      populate: {
        path: "items.product", // Populate product details in the cart items
        model: "Product", // Ensure Product model is referenced correctly
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Send populated cart details in response
    res.status(200).json({ data: cart });
  } catch (error) {
    console.error("Error fetching cart details:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    console.log("User email:", user.email);  // Debugging to check email
    console.log("Product ID to remove:", id);  // Debugging to check product ID

    // const cart = await Cart.findOne({ email: user.email });
    const cart = await User.findOne({ email: user.email }).populate({
      path: "cart",
      populate: {
        path: "items.product", // Populate product details in the cart items
        model: "Product", // Ensure Product model is referenced correctly
      },
    });

  
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Proceed to remove item
    cart.items = cart.items.filter(item => item.product.toString() !== id);
    await cart.save();

    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ error: "Failed to remove product" });
  }
};
 