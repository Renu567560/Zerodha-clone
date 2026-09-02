import axios from "axios";

const API = axios.create({
    baseURL: "http://13.126.153.249:3002",
    withCredentials: true // Cookies send/receive karne ke liye zaruri hai
});

export default API;