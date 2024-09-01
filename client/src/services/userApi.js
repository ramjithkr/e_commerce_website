import axios from "axios";



export const userLogin = async (data) => {
  try {
    const response = await axios({
        url: "http://localhost:3000/api/v1/user/login", 
        method: "POST",
        data,
        withCredentials: true,
      });
      return   response?.data
  } catch (error) {
    console.error("Error in user login:", error);
  }
};


export const UserCheck = async () => {
   
}