import axios from "axios";
import { useSession } from "next-auth/react";

export default function useAxios() {

    const session = useSession()

    const axiosConfig = axios.create({
        baseURL: 'http://45.149.77.156:8081',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    axiosConfig.interceptors.request.use(
        async (config) => {
            if (session.data.user.apiToken) {
                config.headers['Authorization'] = `Bearer ${response.data.token.value}`
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }

    )


    return { axiosConfig }
}