import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:9090/v1/contact",
  timeout: 1000,
  // If no authentication is set up, this can be ignored
  headers: {
    Authorization: `Bearer ${process.env.SERVER_ACCESS_TOKEN}`
  }
});

export default request;
