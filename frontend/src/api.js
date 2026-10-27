import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "https://zerodha-clone-i7fz.onrender.com",
  withCredentials: true,
});

export default API;