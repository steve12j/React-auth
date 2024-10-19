import axios from "axios";

const BASE_URL = 'http://localhost:3500'

const axiosInstance = axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

export default axiosInstance;