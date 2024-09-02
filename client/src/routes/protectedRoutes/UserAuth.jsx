import { useEffect } from "react";
import { axiosInstance } from "./../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

export const UserAuth = ({ children }) => {
  const navgate = useNavigate();
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axiosInstance({
          url: "/user/check-user",
          method: "GET",
          withCredentials: true,
        });
        // console.log(response, "=====response");
        return response?.data;
      } catch (error) {
        navgate("/login");
        console.error("Authentication check failed:",error);
      }
    };

    checkUser();
  });

  return children; 
};
