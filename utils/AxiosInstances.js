// api.js
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

// // Add response interceptor
// api.interceptors.response.use(
//     response => response,
//     async error => {
//         console.log(error);
//         const originalRequest = error.config;
//         if (error.response && error.response.status === 401 && !originalRequest._retry) {
//             console.log(error);

//         }
//         return Promise.reject(error);
//     }
// );

export { api };