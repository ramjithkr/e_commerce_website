
import { Product } from './../../models/productModel.js';
import Cart from './../../models/cartModel.js';





export const addProductToCart = async (req, res) => {
  const {  id, quantity} = req.body;
  const productId = id;
  const {userId} =req.user;
  // Check if productId and quantity are provided
  if (!productId || !quantity) {
    return res.status(400).json({ success: false, message: 'Product ID and quantity are required.' });
  }

  try {
   

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    // Find or create the cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: id, items: [] });
    }

    // Check if the product is already in the cart
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      // Update the quantity if the item already exists in the cart
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add a new item to the cart
      cart.items.push({ product: productId, quantity });
    }

    // Save the cart
    await cart.save();

    res.status(200).json({ success: true, message: 'Product added to cart successfully!', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};






export const getCartList = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming 'id' holds the user's ObjectId in req.user
    console.log("User ID=====", userId);

    let cart = await Cart.findOne({ user: userId }).populate('items.product'); // Populating product details

    // If no cart found, create an empty cart for the user
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
      await cart.save();
    }

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
