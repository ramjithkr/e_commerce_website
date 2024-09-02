import { useEffect } from "react";
import { axiosInstance } from "./../../config/axiosInstance";

export const UserAuth = ({ children }) => {
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axiosInstance({
          url: "/user/check-user",
          method: "GET",
          withCredentials: true,
        });
        console.log(response, "=====response");
        return response?.data;
        
      } catch (error) {
        console.error("Authentication check failed:", error);
      }
    };

    checkUser();
  }, []);

  return children;
};
