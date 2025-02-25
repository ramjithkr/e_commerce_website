import bcrypt from "bcrypt";

import { Admin } from "../../models/adminModels.js";
import { generateAdminToken } from "./../../utils/genreateAdminToken.js";
import { User } from "./../../models/userModel.js";
import { Product } from "../../models/productModel.js";
import { Session } from "../../models/sectionModel.js";

export const adminCreate = async (req, res) => {
  try {
    const { name, email, password, mobile, profilepic, product } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const adminExist = await Admin.findOne({ email: email });
    if (adminExist) {
      return res
        .status(404)
        .json({ success: false, message: "Admin already exists" });
    }

    const saltRound = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRound);

    const newAdmin = new Admin({
      name: name,
      email: email,
      password: hashedPassword,
      mobile,
      role: "admin",
      profilepic,
      product,
    });

    await newAdmin.save();

    const token = generateAdminToken(email);

    res.cookie("token", token);
    res
      .status(201)
      .json({ success: true, message: "Admin created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminExists = await Admin.findOne({ email });

    if (!adminExists) {
      return res
        .status(400)
        .json({ success: false, message: "Admin not found" });
    }

    const passwordMatch = bcrypt.compareSync(password, adminExists.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Admin not authenticated" });
    }

    const token = generateAdminToken(adminExists.email);

    res.cookie("token", token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });
    res.status(200).json({ success: true, message: "Admin login successful" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error !!" });
  }
};

export const adminProfile = async (req, res) => {
  try {
    // const {id} = req.id
    const admin = req.admin;
    // const adminData = await Admin.findById(id);

    const adminData = await Admin.findOne({ email: admin.email }).select(
      "-password"
    );

    res
      .status(200)
      .json({ success: true, message: "Admin data fetched", data: adminData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const checkAdmin = async (req, res) => {
  try {
    const admin = req.admin;

    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin not authenticated!" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Admin authenticated successfully!" });
  } catch (error) {
    console.error("Error in checkAdmin:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const adminLogout = (req, res) => {
  try {
    res.clearCookie("token", {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error!!!" });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllUsersCarts = async (req, res) => {
  try {
    const users = await User.find()
      .select("name email cart")
      .populate("cart.items.product", "title price");

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }

    const carts = users.map((user) => ({
      name: user.name,
      email: user.email,
      cart: user.cart,
    }));

    res.status(200).json({ success: true, data: carts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSingleUserCart = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select("name email cart")
      .populate("cart.productId", "title price");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Rating.find().populate("productId", "title");

    if (!reviews || reviews.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No reviews found" });
    }

    res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAdminProductDetails = async (req, res) => {
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

// Function to get the list of users
export const getUsersList = async (req, res) => {
  try {
    // Find all users and select the required fields (photo, name, email, createdAt)
    const users = await User.find({}, "photo name email createdAt");

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = req.admin;

    if (admin.email !== "ramjithkr5441@gmail.com") {
      return res.status(403).json({
        success: false,
        message: "Only superadmins can delete users.",
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Proceed to delete the user
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllUserOrders = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Users not found" });
    }

    const allOrders = await Promise.all(
      users.map(async (user) => {
        const orders = await Session.find({ user: user._id }).populate({
          path: "products.product", // Populate the product details
          select: "image title price", // Select only the required fields
        });

        if (!orders || orders.length === 0) {
          return null; // Return null for users with no orders
        }

        // Map over orders to format them
        const formattedOrders = orders.map((order) => {
          const totalPrice = order.products.reduce((total, item) => {
            return total + item.product.price * item.quantity;
          }, 0);

          return {
            sessionId: order.sessionId,
            products: order.products.map((item) => ({
              img: item.product.image,
              title: item.product.title,
              price: item.product.price,
              quantity: item.quantity,
              status: item.status, // Individual product status
              totalProductPrice: item.product.price * item.quantity,
            })),
            totalPrice: totalPrice,
            currency: order.currency,
            payment_status: order.payment_status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              // Add more fields if needed
            },
          };
        });

        return formattedOrders;
      })
    );

    const flattenedOrders = allOrders.flat().filter((order) => order !== null); // Remove null entries and flatten

    if (flattenedOrders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found" });
    }

    res.status(200).json({ success: true, data: flattenedOrders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
