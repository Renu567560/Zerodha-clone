import axios from "axios";

const API = axios.create({
    baseURL: "https://zerodha-clone-i7fz.onrender.com",
    withCredentials: true // Cookies send/receive karne ke liye zaruri hai
});

export default API;