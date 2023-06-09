import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.SERVER,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;