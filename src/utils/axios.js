import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://45.149.77.156:8081',  // BASE URL
    headers: {
        'Content-Type': 'application/json', // CONTENT TYPE
    },
});

export default axiosConfig;