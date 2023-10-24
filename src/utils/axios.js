import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://45.149.77.156:8081',
    headers: {
        'Content-Type': 'application/json',
    },
});


export default axiosConfig;


// axiosConfig.interceptors.request.use(
//     async (config) => {
//         const response = await axios.get('/api/auth/apiToken');
//         const apiToken = response.data.apiToken;
//         console.log(apiToken)

//         // if (apiToken) {
//         //     config.headers['Authorization'] = `Bearer ${apiToken}`;
//         // }

//         // return config;

//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

