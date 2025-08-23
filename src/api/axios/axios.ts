import axios from "axios";

const axiosInstance = axios.create({ withCredentials: true });

// With credentials for both requests and responses

export { axiosInstance };
