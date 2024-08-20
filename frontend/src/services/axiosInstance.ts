import axios from "axios";
import { env } from "process";

const axiosBackendInstance = axios.create({
  baseURL: `${env.NEXT_PUBLIC_API_BASE_URL}/api`,
  //   withCredentials: true,
});

axiosBackendInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosBackendInstance;
