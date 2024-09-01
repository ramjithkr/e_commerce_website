import axios from "axios";

export const axiosInstance = axios.create({
  baseUrl: `${import.meta.env.VITE_API_URL}/api/v1`,
});
