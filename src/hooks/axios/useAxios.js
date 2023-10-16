import axios from "axios";

export default function useAxios() {
    const axiosConfig = axios.create({
        baseURL: 'http://45.149.77.156:8081',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return { axiosConfig }
}