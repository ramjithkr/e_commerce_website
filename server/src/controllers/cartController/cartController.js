import { Cart } from "../../models/cartModel.js";


export const addProductToCart = async (req, res) => {
  try {
    const {id, productId, quantity } = req.body;

    let cart = await Cart.findOne({ customer: customerId });

    if (!cart) {
      cart = new Cart({ user: id, products: [] });
    }

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ success: true, message: "Product added to cart", data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const { id, productId } = req.body;

    const cart = await Cart.findOne({ customer: user });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.products = cart.products.filter(p => p.product.toString() !== productId);

    await cart.save();
    res.status(200).json({ success: true, message: "Product removed from cart", data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getCartDetails = async (req, res) => {
  try {
    const { user } = req.params;

    const cart = await Cart.findOne({ user: user }).populate('products.product');

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({ success: true, message: "Cart details fetched", data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
