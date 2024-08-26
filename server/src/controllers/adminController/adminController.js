import bcrypt from "bcrypt";

import { Admin } from "../../models/adminModels.js";
import { generateAdminToken } from "./../../utils/genreateAdminToken.js";
import { loginFunction } from "../../utils/controllerFunction.js";

export const adminCreate = async (req, res) => {
  try {
    const { name, email, password, mobile, profilepic, product } = req.body;
    if ((!name || !email || !password, !mobile)) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });
    }
    const adminExist = await Admin.findOne({ email: email });
    if (adminExist) {
      return res
        .status(404)
        .json({ success: false, message: "admin allredy exist" });
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
      .json({ success: true, message: "admin created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    loginFunction(email, password);

    const adminExists = await Admin.findOne({ email: email });

    if (!adminExists) {
      return res
        .status(400)
        .json({ sucess: false, message: " admin not found" });
    }
    const passwordMatch = bcrypt.compareSync(password, adminExists.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, message: " admin not authenticate" });
    }
    const token = generateAdminToken(email);

    res.cookie("token", token);
    res
      .status(201)
      .json({ sucess: true, message: "admin Login  successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const adminProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const adminData = await Admin.findById(id);

    if (!adminData) {
      return res
        .status(400)
        .json({ success: false, message: " admin not found" });
    }
    res
      .status(200)
      .json({ success: true, message: " admin data fetched", data: adminData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const checkAdmin = async (req, res) => {
  const admin = req.admin;
  if (!admin) {
    return res
      .status(400)
      .json({ success: false, message: "admin not authericated" });
  }
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

export const adminLogout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error!!!" });
  }
};


export const getUsersList = (req, res) => {}