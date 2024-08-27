import bcrypt from "bcrypt";
import { generateUserToken } from "../../utils/generateToken.js";

import { cloudinaryInstance } from "../../config/cloudneryConfig.js";

import { User } from "./../../models/userModel.js";

export const userCreate = async (req, res) => {
  try {
    const { name, email, password, mobile, profilepic, product } = req.body;
    if (!name || !email || !password || !mobile) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User already exists" });
    }

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

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      mobile,
      profilepic: finalProfilePic,
      product,
    });

    await newUser.save();

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
        .json({ success: false, message: "all fields required" });
    }

    const userExists = await User.findOne({ email: email });

    if (!userExists.email) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const passwordMatch = bcrypt.compareSync(password, userExists.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "user not authenticate" });
    }

    const token = generateUserToken(email);

    res.cookie("token", token);
    res.status(201).json({ success: true, message: "User Login successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const userProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const userData = await User.findById(id);

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User data fetched", data: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const checkUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not authenticated" });
    }

    res.json({ success: true, message: "user authenticated" });
  } catch (error) {
    console.error(error);
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
