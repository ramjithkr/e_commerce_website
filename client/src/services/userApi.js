import axios from "axios";


export const userLogin = async (data) => {
  try {
    const response = await axios({
      url: "http://localhost:3000/api/v1/user/login",
      method: "POST",
      data,
      withCredentials: true,
    });

    // Assuming the API response contains a `success` field
    if (response.data && response.data.success) {
      return { success: true, message: "Login successful" };
    } else {
      return { success: false, message: response.data?.message || "Invalid credentials" };
    }
  } catch (error) {
    console.error("Error in user login:", error);
    return { success: false, message: "An error occurred during login" };
  }
};


