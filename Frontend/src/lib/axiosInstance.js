import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // ✅ automatically include cookies
});

export default axiosInstance;
