import toast from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance";

export const userLogin = async (data) => {
  try {
    const response = await axiosInstance({
      url: "/user/login",
      method: "POST",
      data,
      withCredentials: true,
    });

    return response?.data;
  } catch (error) {
    console.error("Error in user login:", error);
    return {
      success: false,
      message: "Login failed: User not found or incorrect password",
    };
  }
};

export const userCheck = async () => {
  try {
    const response = await axiosInstance({
      url: "/user/user-check",
      method: "GET",
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const userLogout = async () => {
  try {
    const response = await axiosInstance({
      url: "/user/logout",
      method: "POST",
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserProfile = async (setUser) => {
  try {
    const response = await axiosInstance({
      url: "/user/profile",
      method: "GET",
      withCredentials: true,
    });
    setUser(response?.data?.data)
  } catch (error) {
    console.log(error);
    toast.error("error fetching data  from server");
  }
};
