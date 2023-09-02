import axios from "axios";

const BASE_URL = import.meta.env.VITE_URL;

export const axiosBase = axios.create({
    baseURL : BASE_URL,
    crossDomain: true,
    headers: { 
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    },
});