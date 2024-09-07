import bcrypt from "bcrypt";
import { generateUserToken } from "../../utils/generateToken.js";

import { cloudinaryInstance } from "../../config/cloudneryConfig.js";

import { User } from "./../../models/userModel.js";

export const userCreate = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      mobile,
      profilepic,
      product,
    } = req.body;

    // Check if all required fields are present
    if (!name || !email || !password || !confirmPassword || !mobile) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    let finalProfilePic = profilepic;

    // If no profile pic is provided, upload the default one to Cloudinary
    if (!profilepic) {
      const defaultImageUrl = process.env.defaultImageUrl;
      const uploadResult = await cloudinaryInstance.uploader.upload(
        defaultImageUrl,
        { folder: "e_commerce_website" }
      );
      finalProfilePic = uploadResult.url;
    }

    // Create the new user
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      mobile,
      profilepic: finalProfilePic,
      product,
    });

    // Save the user to the database
    await newUser.save();

    // Generate and send token
    const token = generateUserToken(email);
    res.cookie("token", token);
    res.json({ success: true, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const passwordMatch = bcrypt.compareSync(password, userExists.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateUserToken(userExists.email); // Generate token using user's email

    res.cookie("token", token, { httpOnly: true }); // Secure the cookie with httpOnly flag
    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const userProfile = async (req, res, next) => {
  try {
    const user = req.user;
    // const id = req.id// 
    const useData = await User.findOne({ email: user.email }).select(
      "-password"
    );
    // const useData = await User.findById(id).select("-password");

    res.json({ success: true, message: "user data fetched", data: useData });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const checkUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    res.json({ success: true, message: "User authenticated" });
  } catch (error) {
    console.error("Check user error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const userLogout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error!!!" });
  }
};
