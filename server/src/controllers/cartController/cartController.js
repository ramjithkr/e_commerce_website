import Cart from "../../models/cartModel.js";
import { Product } from "../../models/productModel.js";

export const addProductToCart = async (req, res) => {
  try {
    // Extract user ID from req.user (assuming req.user contains user details)
    const userId = req.user._id;  // Ensure req.user has the user ID

    // Extract productId and quantity from request body
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the cart for the user
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Cart exists, check if product is already in the cart
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

      if (itemIndex > -1) {
        // Product is already in the cart, update the quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Product is not in the cart, add new item
        cart.items.push({ product: productId, quantity });
      }

      // Save the updated cart
      await cart.save();
    } else {
      // No cart exists, create a new one
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });

      // Save the new cart
      await cart.save();
    }

    res.status(200).json({ message: "Product added to cart successfully", cart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};








export const getCartList = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming authUser middleware attaches user to req

    // Find the cart for the user
    const cart = await Cart.findOne({ user: userId }).populate("items.product"); // Populate product details

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Send cart details in the response
    res.status(200).json({ data: cart.items });
  } catch (error) {
    console.error("Error fetching cart details:", error);
    res.status(500).json({ message: "Server error" });
  }
};
