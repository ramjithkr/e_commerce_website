import { Wishlist } from "../../models/wishlistModel.js";


// Add a product to the wishlist
export const addProductToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const customerId = req.user.id; // Assuming the user is authenticated

    let wishlist = await Wishlist.findOne({ customer: customerId });

    if (!wishlist) {
      wishlist = new Wishlist({ customer: customerId, products: [] });
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
      return res.status(200).json({ success: true, message: "Product added to wishlist", data: wishlist });
    }

    res.status(400).json({ success: false, message: "Product already in wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Remove a product from the wishlist
export const removeProductFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const customerId = req.user.id;

    const wishlist = await Wishlist.findOne({ customer: customerId });

    if (!wishlist) {
      return res.status(404).json({ success: false, message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(p => p.toString() !== productId);

    await wishlist.save();
    res.status(200).json({ success: true, message: "Product removed from wishlist", data: wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get the user's wishlist
export const getWishlistDetails = async (req, res) => {
  try {
    const customerId = req.user.id;

    const wishlist = await Wishlist.findOne({ customer: customerId }).populate('products');

    if (!wishlist) {
      return res.status(404).json({ success: false, message: "Wishlist not found" });
    }

    res.status(200).json({ success: true, message: "Wishlist details fetched", data: wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
