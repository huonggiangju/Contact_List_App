import axios from "axios";

const axiosRequest = axios.create({
  baseURL: "http://localhost:9090/v1/contact",
  timeout: 1000,
 
});

export default axiosRequest;