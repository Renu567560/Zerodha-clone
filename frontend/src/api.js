import axios from "axios";

const API = axios.create({
  baseURL:  "https://zerodha-clone-i7fz.onrender.com",
  withCredentials: true,
});

export default API;