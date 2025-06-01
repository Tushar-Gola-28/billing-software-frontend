// api.js
import { notify } from '@/components';
import { logoutVendor } from '@/services';
import axios from 'axios';


const api = axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true,
});

// Add request interceptor
api.interceptors.request.use(
    async config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add response interceptor
api.interceptors.response.use(
    response => response,
    async error => {
        console.log(error);
        const originalRequest = error.config;
        if (error.response && error.response.status === 440 && !originalRequest._retry) {
            console.log(error?.response?.data);
            notify(error?.response?.data?.message)
            logoutVendor()
            window.location.href = "/"

        }
        return Promise.reject(error);
    }
);

export { api };