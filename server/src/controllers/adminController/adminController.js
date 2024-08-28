import bcrypt from "bcrypt";

import { Admin } from "../../models/adminModels.js";
import { generateAdminToken } from "./../../utils/genreateAdminToken.js";
import { User } from "./../../models/userModel.js";
import { Product } from "../../models/productModel.js";
import { Rating } from "../../models/ratingModel.js";
import { Cart } from "./../../models/cartModel.js";

// export const adminCreate = async (req, res) => {
//   try {
//     const { name, email, password, mobile, profilepic, product } = req.body;
//     if (!name || !email || !password || !mobile) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }
//     const adminExist = await Admin.findOne({ email: email });
//     if (adminExist) {
//       return res.status(404).json({ success: false, message: "Admin already exists" });
//     }

//     const saltRound = 10;
//     const hashedPassword = bcrypt.hashSync(password, saltRound);

//     const newAdmin = new Admin({
//       name: name,
//       email: email,
//       password: hashedPassword,
//       mobile,
//       role: "admin",
//       profilepic,
//       product,
//     });

//     await newAdmin.save();

//     const token = generateAdminToken(email);

//     res.cookie("token", token);
//     res.status(201).json({ success: true, message: "Admin created successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminExists = await Admin.findOne({ email: email });

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

    const token = generateAdminToken(email);

    res.cookie("token", token);
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
    const { id } = req.params;
    const adminData = await Admin.findById(id);

    if (!adminData) {
      return res
        .status(400)
        .json({ success: false, message: "Admin not found" });
    }
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
        .json({ success: false, message: "Admin not authenticated" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const adminLogout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error!!!" });
  }
};

export const getUsersList = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users.length) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
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
