import { axiosInstance } from "../config/axiosInstance";


export const userLogin = async (data) => {
  try {
    const response = await axiosInstance({
      url: "/user/login",
      method: "POST",
      data,
      withCredentials: true,
    });

    return  response?.data

    // Assuming the API response contains a `success` field
    // if (response.data && response.data.success) {
    //   return { success: true, message: "Login successful" };
    // } else {
    //   return { success: false, message: response.data?.message || "Invalid credentials" };
    // }
 
  } catch (error) {
    console.error("Error in user login:", error);
    return { success: false, message: "An error occurred during login" };
  }
};


export const userCheck = async ()=>{
  try {
    const response = await axiosInstance({
      url: "/user/user-check",
      method: "GET",
      withCredentials: true,
    })
    return response?.data
  } catch (error) {
    console.log(error)
  }
}


