import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://45.149.77.156:8081',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosConfig;